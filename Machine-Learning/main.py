from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf 
from tensorflow.keras.preprocessing.text import Tokenizer
import pickle


import uvicorn
import base64

app = FastAPI()
# Store all models stuff here (Tokenizers, Models, etc.)
model_data = {}
# Variables and Parameters settings
max_length = 31
IMAGE_SHAPE = (299, 299)

MODEL_PATH = "./CNN_GRU_Attention/"
# Loading all models and annotations
image_features_extract_model = tf.keras.models.load_model(MODEL_PATH + 'image_features_extract_model.keras')
encoder = tf.saved_model.load(MODEL_PATH + "encoder")
decoder = tf.saved_model.load(MODEL_PATH + "decoder")
annotations = []
with open(MODEL_PATH + 'annotations.pkl', 'rb') as f:
    annotations = pickle.load(f) 

top_word_cnt = 5000
tokenizer = Tokenizer(num_words = top_word_cnt+1, filters= '!"#$%^&*()_+.,:;-?/~`{}[]|\=@ ',
                    lower = True, char_level = False, 
                    oov_token = 'UNK')
tokenizer.fit_on_texts(annotations)
tokenizer.word_index['PAD'] = 0
tokenizer.index_word[0] = 'PAD'

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event('startup')
def init_data():
    print("init call")
    # model_data["encoder"] = encoder
    # model_data["decoder"] = decoder
    # model_data["image_features_extract_model"] = image_features_extract_model
    # model_data["tokenizer"] = tokenizer
    # return model_data

def load_images(image_path):
    img = tf.io.read_file(image_path, name = None)
    img = tf.io.decode_image(img)
    img = tf.image.resize(img, IMAGE_SHAPE)
    img = tf.keras.applications.inception_v3.preprocess_input(img)
    return img, image_path

def evaluate(image):
    hidden = tf.zeros((1, 512))
    temp_input = tf.expand_dims(load_images(image)[0], 0)
    img_tensor_val = image_features_extract_model(temp_input) 
    img_tensor_val = tf.reshape(img_tensor_val, (img_tensor_val.shape[0], -1, img_tensor_val.shape[3]))
    features = encoder(img_tensor_val) 
    dec_input = tf.expand_dims([tokenizer.word_index['<start>']], 0)
    result = []
    for i in range(max_length):
        predictions, hidden, attention_weights = decoder(dec_input, features, hidden) 
        predicted_id = tf.argmax(predictions[0]).numpy() 
        result.append (tokenizer.index_word[predicted_id])
        if tokenizer.index_word[predicted_id] == '<end>':
            return result,predictions
        dec_input = tf.expand_dims([predicted_id], 0)
    
    return result, predictions

def test_global():
    print(encoder.signatures)


class ImageCaptioningBody(BaseModel):
    imgdata: str


@app.get("/")
async def root():
    return {"message": "Hello, FastAPI!"}


@app.post("/captions")
async def generate_captions(body: ImageCaptioningBody):
    image_as_str = body.imgdata
    image_as_bytes = str.encode(image_as_str)  # convert string to bytes
    img_recovered = base64.b64decode(image_as_bytes)  # decode base64string
    try:
        with open("uploaded_image.jpg", "wb") as f:
            f.write(img_recovered)
    except Exception:
        return {"message": "There was an error uploading the file"}
    
    try:
        (result, pred_test) = evaluate("uploaded_image.jpg")
        pred_caption = ' '.join(result).rsplit(' ', 1)[0]
        return {"captions": pred_caption}
    except Exception:
        print(Exception)
        return {"message": "There was an error generating captions for the image", "err": Exception}
    return {"message": f"Successfuly uploaded image"} 



if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)
