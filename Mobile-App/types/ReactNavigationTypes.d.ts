import { CameraCapturedPicture } from 'expo-camera';

type RootStackParamList = {
  Home: { sort: 'latest' | 'top' } | undefined;
  'View Result': { img: CameraCapturedPicture | { uri: string }; results?: string };
  'Download Result': { img: CameraCapturedPicture };
};

type RootDrawerParamList = {
  'Take Picture': undefined;
  History: undefined;
};
