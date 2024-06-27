import { DATABASE_PATH, IMAGE_DIR_PATH } from '@EyeSee/constants/constants';
import { RootStackParamList } from '@EyeSee/types/ReactNavigationTypes';
import { ButtonText, Center, Spinner } from '@gluestack-ui/themed';
import { Box } from '@gluestack-ui/themed';
import { Button, Image, Text, VStack } from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCameraPermissions } from 'expo-camera';
import {
  StorageAccessFramework,
  documentDirectory,
  makeDirectoryAsync,
  readDirectoryAsync,
  writeAsStringAsync,
} from 'expo-file-system';
import { useEffect } from 'react';

const PermissionsScreen: React.FC<NativeStackScreenProps<RootStackParamList, 'Permissions'>> = (
  props
) => {
  const { route, navigation } = props;
  const CameraAsset = require('../assets/Camera.png');
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();

  const requestPermissions = () => {
    if (!cameraPermission?.granted) {
      requestCameraPermission();
    }
  };

  useEffect(() => {
    // Check if directory for Image exists in app's data dir
    readDirectoryAsync(documentDirectory || '').then((data) => {
      const imageDir = data.find((itemName) => itemName == 'Images');
      if (!imageDir) {
        makeDirectoryAsync(IMAGE_DIR_PATH)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
      }

      const databaseDir = data.find((itemName) => itemName == 'data.json');
      if (!databaseDir) {
        writeAsStringAsync(DATABASE_PATH || '', JSON.stringify([])).catch((err) =>
          console.log(err)
        );
      }
      return true;
    });

    // Navigate if permission granted
    if (cameraPermission?.granted) {
      navigation.replace('Take Picture');
    }
  }, [cameraPermission]);

  const renderPermissionsView = () => {
    if (!cameraPermission) {
      return (
        <VStack h="100%" padding="$10" alignItems="center" justifyContent="center" space="sm">
          <Spinner size={'large'} />
          <Text fontSize="$xl">Loading... Please Wait...</Text>
        </VStack>
      );
    } else if (!cameraPermission.granted) {
      return (
        <Center h="100%" padding="$10" rowGap="$5" alignItems="center">
          <Image w="$40" h="$40" source={CameraAsset} alt="Image of a Camera" />
          <Text fontSize="$lg" style={{ textAlign: 'center' }}>
            We need your permission to show the camera and access your storage.
          </Text>
          <Button onPress={requestPermissions}>
            <ButtonText>Grant Permission!</ButtonText>
          </Button>
        </Center>
      );
    }
  };

  return <>{renderPermissionsView()}</>;
};

export default PermissionsScreen;
