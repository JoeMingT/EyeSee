import { ESScreenWrapperProps } from './props';
import { Box } from '@gluestack-ui/themed';

const ESScreenWrapper: React.FC<ESScreenWrapperProps> = (props) => {
  return (
    <Box style={{ paddingVertical: 15, flex: 1 }} {...props}>
      {}
    </Box>
  );
};

export default ESScreenWrapper;
