import { BottomControlPanel } from '@ESComponents/organisms';
import {
  AddIcon,
  Button,
  ButtonIcon,
  ButtonText,
  Icon,
  MenuItem,
  MenuItemLabel,
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
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootDrawerParamList, RootStackParamList } from '@EyeSee/types/ReactNavigationTypes';

const TakePictureScreen: React.FC<DrawerScreenProps<RootDrawerParamList, 'Take Picture'>> = (
  props
) => {
  const { navigation, route } = props;

  const cameraRef = useRef<null | CameraView>(null);

  const [isCameraReady, setIsCameraReady] = useState<boolean>(false);
  const [currentMode, setCurrentMode] = useState<string>('Describe Scene');
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    // return navigation;
    navigation.setOptions({ headerTitle: currentMode });
  }, [navigation, currentMode]);

  const takePicture = () => {
    if (!cameraRef) return;
    if (cameraRef.current && isCameraReady) {
      const photo = cameraRef.current
        .takePictureAsync()
        .then((data) => {
          // setCapturedImage(res);
          navigation.navigate('View Result', {
            img: data,
            results: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel rutrum justo. Sed
          odio est, aliquet eu velit malesuada, dictum egestas ex. Aliquam venenatis facilisis
          dui, vitae molestie magna tempus ut. Phasellus non orci sed nunc varius vehicula
          venenatis sed orci. In vel dapibus mauris. Vestibulum consectetur dignissim odio eu
          elementum. Aliquam placerat pulvinar mattis. Aliquam nec finibus dui, vel lobortis
          augue. Donec varius mauris at odio auctor, eget commodo sem egestas. Ut vel porttitor
          metus. Sed finibus efficitur diam, at eleifend augue semper in. Curabitur rhoncus lorem
          sed nunc feugiat, eget tincidunt leo mattis. Suspendisse potenti. Donec pulvinar neque
          eu felis pulvinar, nec tristique quam porttitor. Donec quis euismod magna. Mauris
          convallis euismod commodo.`,
          });
          return data;
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  };

  const renderCameraView = () => {
    if (!permission) {
      // Camera permissions are still loading.
      return (
        <HStack space="sm">
          <Spinner size={'large'} />
          <Text size="lg">Please Wait</Text>
        </HStack>
      );
    } else if (!permission.granted) {
      // Camera permissions are not granted yet.
      return (
        <VStack>
          <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
          <Button onPress={requestPermission}>
            <Text>Grant Permission</Text>
          </Button>
        </VStack>
      );
    }

    return (
      <CameraView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        onCameraReady={() => setIsCameraReady(true)}
        ref={cameraRef}
      />
    );
  };

  return (
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
          <MenuItem key="Scene" textValue="Scene" onPress={() => setCurrentMode('Describe Scene')}>
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
          onPress={takePicture}
        />
        <Button size="xl" variant="outline">
          <ButtonText size="2xl">Album</ButtonText>
        </Button>
      </HStack>
    </VStack>
  );
};

export default TakePictureScreen;
