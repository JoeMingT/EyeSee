import { historyData } from '@EyeSee/data/historyData';
import { Avatar, Icon, Image, Pressable, ScrollView, Text } from '@gluestack-ui/themed';
import { Box, HStack, VStack } from '@gluestack-ui/themed';
import { FlatList } from 'react-native-gesture-handler';
import { ArrowRightIcon } from 'lucide-react-native';
import { RootDrawerParamList, RootStackParamList } from '@EyeSee/types/ReactNavigationTypes';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useLocalData } from '@EyeSee/hooks/useLocalData';
import React, { useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const ViewHistoryScreen: React.FC<NativeStackScreenProps<RootStackParamList, 'History'>> = (
  props
) => {
  const { navigation, route } = props;

  const { localData, readLocalDataFromDB } = useLocalData();

  useFocusEffect(
    useCallback(() => {
      // do the stuff you wanna do
      readLocalDataFromDB();
    }, [])
  );

  return (
    <ScrollView>
      {localData.map((item) => {
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
            key={item.date}
            onPress={() => navigation.navigate('View Result', item)}
          >
            <HStack space="md" justifyContent="space-around" alignItems="center">
              <HStack alignItems="center" gap="$5">
                <Image
                  source={{ uri: item.imageUri }}
                  borderRadius={15}
                  alt={'Preview Image for Results'}
                />
                <VStack>
                  <Text color="$coolGray800" fontWeight="$bold" $dark-color="$warmGray100">
                    {item.type}
                  </Text>
                  <Text color="$coolGray600" $dark-color="$warmGray200">
                    {item.date}
                  </Text>
                </VStack>
              </HStack>
              <Icon as={ArrowRightIcon} size={'xl'} />
            </HStack>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

export default ViewHistoryScreen;
