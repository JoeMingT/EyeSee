import { RootStackParamList } from '@EyeSee/types/ReactNavigationTypes';
import {
  Box,
  Button,
  ButtonGroup,
  ButtonText,
  Input,
  InputField,
  VStack,
} from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image } from 'expo-image';
import { documentDirectory, moveAsync } from 'expo-file-system';
import { getDocumentAsync } from 'expo-document-picker';

const DownloadResultsScreen: React.FC<
  NativeStackScreenProps<RootStackParamList, 'Download Result'>
> = (props) => {
  const { navigation, route } = props;
  const imageData = route.params?.img;

  const getFolderLocation = async () => {
    // const x = pickDirectory()
    //   .then((data) => console.log(data))
    //   .catch((err) => console.log(err));
    const fileSelected = getDocumentAsync() // { copyToCacheDirectory: true }
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <VStack flex={1}>
      <Box flex={1} margin={'$5'}>
        <Image
          source={{ uri: imageData.uri }}
          alt="Image Taken"
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
            <InputField placeholder={`${documentDirectory}/download`} />
          </Input>
          <Button
            size="xl"
            action="secondary"
            onPress={() => {
              getFolderLocation();
            }}
          >
            <ButtonText size="xl">Change Save Location</ButtonText>
          </Button>
        </Box>
        <ButtonGroup flexWrap={'wrap'} justifyContent="center">
          <Button
            size="xl"
            action="negative"
            onPress={() => {
              navigation.pop();
            }}
          >
            <ButtonText size="xl">Cancel</ButtonText>
          </Button>
          <Button size="xl">
            <ButtonText size="xl">Download</ButtonText>
          </Button>
        </ButtonGroup>
      </VStack>
    </VStack>
  );
};

export default DownloadResultsScreen;
