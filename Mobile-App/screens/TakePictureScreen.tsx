import {
  AddIcon,
  Button,
  ButtonIcon,
  ButtonText,
  Icon,
  MenuItem,
  MenuItemLabel,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  Text,
  VStack,
  View,
} from '@gluestack-ui/themed';
import { Menu } from '@gluestack-ui/themed';
import { Box, HStack, Spinner } from '@gluestack-ui/themed';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { ImageIcon, TypeIcon, ScanLineIcon } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { RootDrawerParamList } from '@EyeSee/types/ReactNavigationTypes';
import {
  EncodingType,
  copyAsync,
  deleteAsync,
  documentDirectory,
  makeDirectoryAsync,
  moveAsync,
  readAsStringAsync,
  readDirectoryAsync,
} from 'expo-file-system';
import { DATABASE_PATH, IMAGE_DIR_PATH } from '@EyeSee/constants/constants';
import { useLocalData } from '@EyeSee/hooks/useLocalData';
import { Heading } from '@gluestack-ui/themed';
import { ModalBody } from '@gluestack-ui/themed';

const TakePictureScreen: React.FC<DrawerScreenProps<RootDrawerParamList, 'Take Picture'>> = (
  props
) => {
  const { navigation, route } = props;

  const modalRef = useRef(null);
  const cameraRef = useRef<null | CameraView>(null);

  const [isCameraReady, setIsCameraReady] = useState<boolean>(false);
  const [currentMode, setCurrentMode] = useState<
    'Describe Scene' | 'Detect Text' | 'Detect Objects'
  >('Describe Scene');
  const { localData, updateLocalData, saveLocalData } = useLocalData();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // return navigation;
    navigation.setOptions({ headerTitle: currentMode });
    saveLocalData();
  }, [navigation, currentMode, localData]);

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
                type: 'TEXT_DETECTION', //we will use this API for text detection purposes.
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
    }

    return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel rutrum justo. Sed';
  };

  const takePicture = () => {
    console.log('entered');
    if (!cameraRef) return;
    if (cameraRef.current && isCameraReady) {
      // Set loading so no spamming of click button
      setIsLoading(true);

      // Where Images will be stored permanently
      cameraRef.current
        .takePictureAsync()
        .then(async (data) => {
          const d = new Date();
          const newImageUri =
            IMAGE_DIR_PATH +
            `/${d.getDate()}-${d.getMonth()}-${d.getFullYear()} ${d.getHours()}${d.getMinutes()}${d.getSeconds()}.jpg`;

          // Save the image data permanently
          if (data && documentDirectory) {
            // Create new file name based on current time on device
            // Copy cached image to permanent storage so it won't be deleted.
            copyAsync({ from: data.uri, to: newImageUri })
              .then((res) => {
                // console.log(res);
                console.log('Copy Done');
              })
              .catch((err) => {
                console.log(err);
              });
          }

          // Send the image over to be processed.
          const results = await processData(newImageUri);
          const newData = {
            imageUri: newImageUri,
            results: results,
            type: currentMode,
            date: `${d.getDate()}-${d.getMonth()}-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`,
          };
          // Save all the data locally for View History by appending at the front. Including the image file, the results obtained and date created
          const newDataArr = [newData, ...localData];

          // console.log('New Data Array at Take Pictures Screen:', newDataArr);
          updateLocalData(newDataArr);

          navigation.navigate('View Result', newData);
          return data;
        })
        .catch((err: any) => {
          console.log(err);
        })
        .finally(() => setIsLoading(false));
    }
  };

  const renderCameraView = () => {
    return (
      <CameraView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        onCameraReady={() => setIsCameraReady(true)}
        ref={cameraRef}
      />
    );
  };

  const renderModal = () => {
    return (
      <Modal isOpen={isLoading} initialFocusRef={modalRef} focusable={true}>
        <ModalBackdrop />
        <ModalContent paddingVertical={'$10'}>
          <ModalBody>
            <Spinner size={'large'} />
            <Heading ref={modalRef} textAlign="center" size="lg">
              Loading... Please Wait...
            </Heading>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };

  return (
    <>
      <VStack flex={1}>
        <Box flex={1}>{renderCameraView()}</Box>
        {/* <BottomControlPanel /> */}
        <HStack flex={0} alignItems={'center'} justifyContent={'space-around'} marginVertical="$7">
          <Menu
            placement="top"
            trigger={({ ...triggerProps }) => {
              return (
                <Button size="xl" {...triggerProps}>
                  <ButtonText size="2xl">Mode</ButtonText>
                </Button>
              );
            }}
          >
            <MenuItem
              key="Scene"
              textValue="Scene"
              onPress={() => setCurrentMode('Describe Scene')}
            >
              <Icon as={ImageIcon} size="lg" mr="$4" />
              <MenuItemLabel size="lg">Scene</MenuItemLabel>
            </MenuItem>
            <MenuItem key="Text" textValue="Text" onPress={() => setCurrentMode('Detect Text')}>
              <Icon as={TypeIcon} size="lg" mr="$4" />
              <MenuItemLabel size="lg">Text Recognition</MenuItemLabel>
            </MenuItem>
            <MenuItem
              key="Object"
              textValue="Object"
              onPress={() => setCurrentMode('Detect Objects')}
            >
              <Icon as={ScanLineIcon} size="lg" mr="$4" />
              <MenuItemLabel size="lg">Object Recognition</MenuItemLabel>
            </MenuItem>
          </Menu>
          <Button
            size={'xl'}
            variant={'outline'}
            borderWidth={'$8'}
            borderRadius={'$full'}
            paddingHorizontal={'$8'}
            paddingVertical={'$8'}
            aria-label={'Take Picture'}
            onPress={() => takePicture()}
            isDisabled={isLoading || !isCameraReady ? true : false}
          />
          <Button size="xl" variant="outline" onPress={() => navigation.navigate('History')}>
            <ButtonText size="2xl">History</ButtonText>
          </Button>
        </HStack>
      </VStack>
      {renderModal()}
    </>
  );
};

export default TakePictureScreen;
