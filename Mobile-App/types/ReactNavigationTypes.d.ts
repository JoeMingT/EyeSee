import { CameraCapturedPicture } from 'expo-camera';

type RootStackParamList = {
  Permissions: {};
  Home: { sort: 'latest' | 'top' } | undefined;
  'View Result': {
    imageUri: string;
    results: string;
    date: string;
    type: 'Describe Scene' | 'Detect Text' | 'Detect Objects';
  };
  'Download Result': {
    imageUri: string;
    results: string;
    date: string;
    type: 'Describe Scene' | 'Detect Text' | 'Detect Objects';
  };
  'Take Picture': undefined;
  History: undefined;
};

type RootDrawerParamList = {
  'Take Picture': undefined;
  History: undefined;
};
