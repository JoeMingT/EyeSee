import { ESScreenWrapperProps } from './props';
import { Box } from '@gluestack-ui/themed';
import { GestureDetector, Gesture, Directions } from 'react-native-gesture-handler';

const ESScreenWrapper: React.FC<ESScreenWrapperProps> = (props) => {
  const { children, ...boxProps } = props;
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
    });

  return (
    <GestureDetector gesture={Gesture.Exclusive(select, nextItem, prevItem, voiceCommand)}>
      <Box flex={1} {...boxProps}>
        {children}
      </Box>
    </GestureDetector>
  );
};

export default ESScreenWrapper;
