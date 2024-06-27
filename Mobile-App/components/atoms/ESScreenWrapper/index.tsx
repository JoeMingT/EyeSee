import { ESScreenWrapperProps } from './props';
import { Box } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import {
  GestureDetector,
  Gesture,
  Directions,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const ESScreenWrapper: React.FC<ESScreenWrapperProps> = (props) => {
  const { children, ...boxProps } = props;
  const navigation = useNavigation();

  const select = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      console.log('Double Tapped');
    });

  const nextItem = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onStart(() => {
      console.log('Swiped Up');
    });

  const prevItem = Gesture.Fling()
    .direction(Directions.LEFT)
    .onStart(() => {
      console.log('Swiped Up');
    });

  const voiceCommand = Gesture.Fling()
    .direction(Directions.UP)
    .onStart(() => {
      console.log('Swiped Up');
      navigation.push('Upload Files');
    });

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={Gesture.Exclusive(select, nextItem, prevItem, voiceCommand)}>
        <Box flex={1} {...boxProps}>
          {children}
        </Box>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default ESScreenWrapper;
