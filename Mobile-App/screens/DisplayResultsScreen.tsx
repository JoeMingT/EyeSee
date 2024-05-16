import { RootStackParamList } from '@EyeSee/types/ReactNavigationTypes';
import { Box, Button, ButtonText, HStack, ScrollView, Text, VStack } from '@gluestack-ui/themed';
import { Image } from 'expo-image';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const DisplayResultsScreen: React.FC<NativeStackScreenProps<RootStackParamList, 'View Result'>> = (
  props
) => {
  const { navigation, route } = props;
  const imageData = route.params?.img;
  const results = route.params?.results;
  return (
    <VStack flex={1}>
      <Box flex={2}>
        <Image
          source={{ uri: imageData.uri }}
          alt="Image Taken"
          contentFit={'cover'}
          contentPosition={'center'}
          style={{ flex: 1 }}
        />
      </Box>
      <VStack marginVertical={'$10'} marginHorizontal={'$5'} flex={1}>
        <ScrollView flex={1}>
          <Text size={'xl'}>{results}</Text>
        </ScrollView>
        <HStack alignItems="center" justifyContent="center" marginTop="$5">
          <Button
            variant="outline"
            flex={1}
            onPress={() => {
              navigation.navigate('Home');
            }}
          >
            <ButtonText underline>Back</ButtonText>
          </Button>
          {/* <Button variant="outline" flex={1}>
            <ButtonText>Return</ButtonText>
          </Button> */}
          <Button
            variant="outline"
            flex={1}
            onPress={() => {
              navigation.navigate('Download Result', { img: imageData });
            }}
          >
            <ButtonText underline>Download</ButtonText>
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default DisplayResultsScreen;
