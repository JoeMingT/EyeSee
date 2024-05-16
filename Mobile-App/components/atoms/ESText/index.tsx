import { Text } from '@gluestack-ui/themed';
import { ESTextProps } from './props';

const ESText: React.FC<ESTextProps> = (props) => {
  const { children, ...textProps } = props;
  return (
    <Text {...textProps}>
      {children}
    </Text>
  );
};

export default ESText;
