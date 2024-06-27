import { RootStackParamList } from '@EyeSee/types/ReactNavigationTypes';
import {
  Box,
  Button,
  ButtonGroup,
  ButtonSpinner,
  ButtonText,
  Input,
  InputField,
  Spinner,
  Toast,
  ToastDescription,
  VStack,
  useToast,
} from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image } from 'expo-image';
import {
  FileSystemRequestDirectoryPermissionsResult,
  StorageAccessFramework,
  documentDirectory,
  moveAsync,
  writeAsStringAsync,
} from 'expo-file-system';
import { useState } from 'react';
import { err } from 'react-native-svg';
import { ToastTitle } from '@gluestack-ui/themed';

const DownloadResultsScreen: React.FC<
  NativeStackScreenProps<RootStackParamList, 'Download Result'>
> = (props) => {
  const { navigation, route } = props;
  const imageUri = route.params?.imageUri;
  const results = route.params?.results;
  const date = route.params?.date;
  const type = route.params?.type;

  const [selectedFileUri, setSelectedFileUri] = useState('');
  const [safPermissions, setSafPermissions] =
    useState<FileSystemRequestDirectoryPermissionsResult>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  const getFolderLocation = async () => {
    const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();

    if (permissions.granted) {
      setSafPermissions(permissions);

      // Gets SAF URI from response
      const uri = permissions.directoryUri;

      // Using the uri, save file.
      setSelectedFileUri(uri);
    }
  };

  const downloadFile = () => {
    const d = new Date();
    const fileName = `/${d}-EyeSee Results.txt`;
    let stringData = `${type} Results
=====================
Date the Result is Created: ${date}
${results}`;

    setIsLoading(true);

    if (safPermissions?.granted) {
      StorageAccessFramework.createFileAsync(selectedFileUri, fileName, 'text/plain')
        .then((res) => {
          console.log('File created successfully');

          StorageAccessFramework.writeAsStringAsync(res, stringData)
            .then((data) => console.log('Write successfully'))
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              setIsLoading(false);
              toast.show({
                placement: 'top',
                render: ({ id }) => {
                  const toastId = 'toast-' + id;
                  return (
                    <Toast
                      nativeID={toastId}
                      action="success"
                      variant="solid"
                      marginVertical={'$7'}
                    >
                      <VStack space="md">
                        <ToastTitle>Download Success!</ToastTitle>
                        <ToastDescription>
                          Your results have been saved in your device locally!
                        </ToastDescription>
                      </VStack>
                    </Toast>
                  );
                },
              });

              navigation.navigate('View Result', { imageUri, results, date, type });
            });
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <VStack flex={1}>
      <Box flex={1} margin={'$5'}>
        <Image
          source={{ uri: imageUri }}
          alt="Preview Image of Item"
          contentFit={'cover'}
          contentPosition={'center'}
          style={{ flex: 1, borderRadius: 20 }}
        />
      </Box>
      <VStack
        flex={1}
        marginVertical={'$8'}
        marginHorizontal={'$16'}
        alignItems="center"
        justifyContent="space-around"
      >
        <Box rowGap="$2">
          <Input variant="outline" size="lg" isReadOnly={true}>
            <InputField placeholder={`${selectedFileUri || 'Choose a Folder'}`} />
          </Input>
          <Button
            size="xl"
            action="secondary"
            onPress={() => {
              getFolderLocation();
            }}
          >
            <ButtonText size="xl">Select Save Location</ButtonText>
          </Button>
        </Box>
        <ButtonGroup flexWrap={'wrap'} justifyContent="center">
          <VStack rowGap={'$3'} flex={1}>
            <Button
              size="xl"
              action="negative"
              onPress={() => {
                navigation.pop();
              }}
            >
              <ButtonText size="xl">Cancel</ButtonText>
            </Button>
            <Button
              size="xl"
              onPress={downloadFile}
              isDisabled={selectedFileUri === '' || isLoading ? true : false}
            >
              {isLoading ? <ButtonSpinner mr="$1" /> : <ButtonText size="xl">Download</ButtonText>}
            </Button>
          </VStack>
        </ButtonGroup>
      </VStack>
    </VStack>
  );
};

export default DownloadResultsScreen;
