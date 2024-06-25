import { Box } from '@gluestack-ui/themed';
import { ESComponentWrapperProps } from './props';
import * as Speech from 'expo-speech';

const ESComponentWrapper: React.FC<ESComponentWrapperProps> = (props) => {
  const { children, speechText, index } = props;
  const speak = () => {
    const thingToSay = 'This is a crazy settings 123';
    Speech.speak(thingToSay);
  };

  return <Box>{children}</Box>;
};

export default ESComponentWrapper;
