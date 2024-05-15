import { View } from 'react-native';
import { Gesture, GestureDetector, PanGestureHandler } from 'react-native-gesture-handler';

const Test: React.FC<any> = () => {
  const testGesture = Gesture.Tap()
    .numberOfTaps(1)
    .onStart(() => {
      console.log('Testing');
    })
    .onEnd(() => {
      console.log('WORK DAMNIT');
    });

  return (
    <GestureDetector gesture={testGesture}>
      <View style={{ backgroundColor: 'plum' }}></View>
    </GestureDetector>
  );
};

export default Test;
