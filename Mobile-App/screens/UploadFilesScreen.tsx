import { RootStackParamList } from '@EyeSee/types/ReactNavigationTypes';
import { Spinner, Text } from '@gluestack-ui/themed';
import { Box, Button, ButtonText, Input, InputField, Icon, Center } from '@gluestack-ui/themed';
import { ButtonGroup } from '@gluestack-ui/themed';
import { VStack } from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getDocumentAsync } from 'expo-document-picker';
import { Image } from 'expo-image';
import { ImageIcon, ImagePlusIcon } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import ImagePlusSvg from '../assets/image-plus.svg';
import { Heading } from '@gluestack-ui/themed';
import {
  EncodingType,
  copyAsync,
  getInfoAsync,
  makeDirectoryAsync,
  readAsStringAsync,
} from 'expo-file-system';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import { useLocalData } from '@EyeSee/hooks/useLocalData';
import { speak } from 'expo-speech';

const UploadFilesScreen: React.FC<NativeStackScreenProps<RootStackParamList, 'Upload Files'>> = (
  props
) => {
  const { navigation, route } = props;
  const { currentMode } = route.params;
  const [imagePath, setImagePath] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { localData, updateLocalData, saveLocalData } = useLocalData();

  useEffect(() => {
    // Whenever localData is updated, save it.
    saveLocalData();
  }, [localData]);

  const getImagePath = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      quality: 1,
      allowsMultipleSelection: false,
    });
    if (result.canceled) {
      return;
    }
    setImagePath(result.assets[0].uri);
  };

  const processData = async (imageUri: string) => {
    if (currentMode === 'Detect Text') {
      const imgAnnotationBaseUrl = 'https://vision.googleapis.com/v1/images:annotate';
      const imgAnnotationWithKey = `${imgAnnotationBaseUrl}?key=${process.env.EXPO_PUBLIC_GOOGLE_CLOUD_API_KEY}`;

      const imageData = await readAsStringAsync(imageUri, { encoding: EncodingType.Base64 });

      const requestData = {
        requests: [
          {
            image: {
              content: imageData,
            },
            features: [
              {
                type: 'DOCUMENT_TEXT_DETECTION', //we will use this API for text detection purposes.
                maxResults: 1,
              },
            ],
          },
        ],
      };

      const response = await fetch(imgAnnotationWithKey, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      const result = await response.json();
      console.log(result);
      const detectedText = result.responses[0].fullTextAnnotation.text;
      return detectedText ? detectedText : { text: "This image doesn't contain any text!" };
    }

    if (currentMode === 'Describe Scene') {
      console.log('Entered');
      const imgCaptionUrl = 'http://192.168.138.15:8000/captions';

      const requestData = {
        imgdata: imageData as string
      }

      const response = await fetch(imgCaptionUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      }).catch(() => speak('Error! Operation Failed! Please Try Again!'));
      console.log('Succeed');
      const result = await response.json();
      return result.captions
    }

    if (currentMode === 'Detect Objects') {
      const imgAnnotationBaseUrl = 'https://vision.googleapis.com/v1/images:annotate';
      const imgAnnotationWithKey = `${imgAnnotationBaseUrl}?key=${process.env.EXPO_PUBLIC_GOOGLE_CLOUD_API_KEY}`;

      const imageData = await readAsStringAsync(imageUri, { encoding: EncodingType.Base64 });

      const requestData = {
        requests: [
          {
            image: {
              content: imageData,
            },
            features: [
              {
                type: 'OBJECT_LOCALIZATION', //we will use this API for text detection purposes.
              },
            ],
          },
        ],
      };

      const response = await fetch(imgAnnotationWithKey, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      const result = await response.json();

      // Further post-processing after getting results (Because it returns a bunch of other stuff as well.)
      // First, get the array of objects detected
      const detectedObjects = result.responses[0].localizedObjectAnnotations;

      // If no object detected
      if (detectedObjects.length === 0) {
        return 'No objects detected. Please try again.';
      }

      // For each object:
      // Check confidence score, if above certain threshold, accept as detected item. If accepted item, get name of item.
      let listOfObj = [];
      for (const object of detectedObjects) {
        if (object.score > 0.5) {
          listOfObj.push(object.name);
        }
      }

      // Once obtaining list of object, format the text to make it look nice.
      let finalStr = 'The objects detected in this image are:\n' + listOfObj.join(', ');
      return finalStr;
    }

    return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel rutrum justo. Sed';
  };

  const uploadFileForProcessing = async () => {
    setIsLoading(true);
    speak('Uploading Image! Loading! Please Wait!');

    const d = new Date();
    const results = await processData(imagePath);
    const newData = {
      imageUri: imagePath,
      results: results,
      type: currentMode,
      date: `${d.getDate()}-${d.getMonth()}-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`,
    };
    // Save all the data locally for View History by appending at the front. Including the image file, the results obtained and date created
    const newDataArr = [newData, ...localData];

    // console.log('New Data Array at Take Pictures Screen:', newDataArr);
    updateLocalData(newDataArr);

    setIsLoading(false);
    // Navigate to view result screen
    navigation.navigate('View Result', newData);
  };

  return (
    <VStack flex={1} margin={'$10'}>
      <Center flex={1} marginBottom={imagePath !== '' ? '$10' : '$10'}>
        {imagePath !== '' ? (
          <Image
            source={{ uri: imagePath }}
            alt="Preview of Uploaded File"
            contentFit="cover"
            contentPosition={'center'}
            style={{ flex: 1, minWidth: '100%', borderRadius: 20 }}
          />
        ) : (
          <Box flex={1}>
            <Image
              source={ImagePlusSvg}
              alt="Upload File to Preview"
              style={{ flex: 1, minWidth: '100%' }}
            />
            <Heading size="3xl" textAlign="center">
              Upload File to Preview
            </Heading>
          </Box>
        )}
      </Center>
      <ButtonGroup flexWrap={'wrap'} justifyContent="center">
        <VStack rowGap={'$3'} flex={1}>
          <Button size="xl" variant="outline" onPress={getImagePath}>
            <ButtonText size="xl">Select File</ButtonText>
          </Button>
          <Button size="xl" action="negative" onPress={() => navigation.pop()}>
            <ButtonText size="xl">Cancel</ButtonText>
          </Button>
          <Button
            size="xl"
            onPress={uploadFileForProcessing}
            isDisabled={imagePath === '' || isLoading ? true : false}
          >
            {!isLoading ? (
              <ButtonText>
                {currentMode === 'Describe Scene'
                  ? 'Generate Captions'
                  : currentMode === 'Detect Text'
                    ? 'Scan Text'
                    : 'Detect Object'}
              </ButtonText>
            ) : (
              <Spinner aria-label="Please Wait" size="large"></Spinner>
            )}
          </Button>
        </VStack>
      </ButtonGroup>
    </VStack>
  );
};

export default UploadFilesScreen;
