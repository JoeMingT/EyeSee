import { historyData } from '@EyeSee/data/historyData';
import { Avatar, Icon, Image, Pressable, ScrollView, Text } from '@gluestack-ui/themed';
import { Box, HStack, VStack } from '@gluestack-ui/themed';
import { FlatList } from 'react-native-gesture-handler';
import { ArrowRightIcon } from 'lucide-react-native';
import { RootDrawerParamList } from '@EyeSee/types/ReactNavigationTypes';
import { DrawerScreenProps } from '@react-navigation/drawer';

const ViewHistoryScreen: React.FC<DrawerScreenProps<RootDrawerParamList, 'History'>> = (props) => {
  const { navigation, route } = props;

  return (
    <ScrollView>
      <FlatList
        data={historyData}
        renderItem={({ item }) => {
          return (
            <Pressable
              borderBottomWidth="$1"
              borderColor="$trueGray800"
              $dark-borderColor="$trueGray100"
              $base-pl={0}
              $base-pr={0}
              $sm-pl="$4"
              $sm-pr="$5"
              py="$2"
              onPress={() =>
                navigation.navigate('View Result', {
                  img: { uri: item.imageLoc },
                  results: item.results,
                })
              }
            >
              <HStack space="md" justifyContent="space-around" alignItems="center">
                <HStack alignItems="center" gap="$5">
                  <Image source={{ uri: item.imageLoc }} borderRadius={15} alt={'Preview Image'} />
                  <VStack>
                    <Text color="$coolGray800" fontWeight="$bold" $dark-color="$warmGray100">
                      {item.type}
                    </Text>
                    <Text color="$coolGray600" $dark-color="$warmGray200">
                      {item.timestamp}
                    </Text>
                  </VStack>
                </HStack>
                <Icon as={ArrowRightIcon} size={'xl'} />
              </HStack>
            </Pressable>
          );
        }}
      />
    </ScrollView>
  );
};

export default ViewHistoryScreen;
