import { Divider } from '@gluestack-ui/themed';
import { ESDividerProps } from './props';

const ESDivider: React.FC<ESDividerProps> = (props) => {
  return <Divider marginHorizontal={20} {...props} />;
};

export default ESDivider;
