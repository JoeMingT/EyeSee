import { ESScreenWrapper, ESText } from '@ESComponents/atoms';
import { BottomControlPanel, Header } from '@ESComponents/organisms';
import { Button, Layout, Spinner } from '@ui-kitten/components';
import { CameraCapturedPicture, CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { err } from 'react-native-svg';

const HomeScreen: React.FC<any> = () => {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraReady, setIsCameraReady] = useState<boolean>(false);
  const cameraRef = useRef<null | CameraView>(null);
  const [capturedImage, setCapturedImage] = useState<CameraCapturedPicture>();

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  function takePicture() {
    if (!cameraRef) return;
    if (cameraRef.current && isCameraReady) {
      const photo = cameraRef.current
        .takePictureAsync()
        .then((res) => {
          setCapturedImage(res);
          console.log(res);
          return res;
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }

  return (
    <>
      <Header currentScreenName="Home Screen" />
      {/* <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ESText category="h1">Hello world!</ESText>
      </Layout> */}
      {capturedImage ? (
        <View style={{ flex: 1 }}>
          <Image source={{ uri: capturedImage.uri }} style={{ flex: 1 }} />
        </View>
      ) : !permission ? (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Spinner size="large" />
        </Layout>
      ) : !permission.granted ? (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ESText style={{ textAlign: 'center' }}>
            We need your permission to show the camera
          </ESText>
          <Button onPress={requestPermission}>Allow</Button>
        </Layout>
      ) : (
        <CameraView
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          facing={facing}
          onCameraReady={() => setIsCameraReady(true)}
          ref={cameraRef}
        >
          <View>
            <TouchableOpacity onPress={toggleCameraFacing}>
              <ESText>Flip Camera</ESText>
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
      <BottomControlPanel onButtonPress={takePicture} />
    </>
  );
};

export default HomeScreen;
