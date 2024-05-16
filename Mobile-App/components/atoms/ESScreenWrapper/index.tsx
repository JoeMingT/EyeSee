import { ESScreenWrapperProps } from './props';
import { Box } from '@gluestack-ui/themed';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

const ESScreenWrapper: React.FC<ESScreenWrapperProps> = (props) => {
  const { children, ...boxProps } = props;
  const select = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      console.log('Testing');
    })
    .onEnd(() => {
      console.log('WORK DAMNIT');
    });

  const nextItem = Gesture.Fling();

  return (
    <GestureDetector gesture={Gesture.Exclusive(select)}>
      <Box flex={1} {...boxProps}>
        {children}
      </Box>
    </GestureDetector>
  );
};

export default ESScreenWrapper;
