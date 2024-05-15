import { Text } from '@ui-kitten/components';
import { ESTextProps } from './props';

const ESText: React.FC<ESTextProps> = (props) => {
  const { children, ...textProps } = props;
  return (
    <Text style={{ fontSize: 20 }} {...textProps}>
      {children}
    </Text>
  );
};

export default ESText;
