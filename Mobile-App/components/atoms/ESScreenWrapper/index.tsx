import { Layout } from '@ui-kitten/components';
import { ESScreenWrapperProps } from './props';

const ESScreenWrapper: React.FC<ESScreenWrapperProps> = (props) => {
  return (
    <Layout collapsable={false} style={{ paddingVertical: 15, flex: 1 }} {...props}>
      {props.children}
    </Layout>
  );
};

export default ESScreenWrapper;
