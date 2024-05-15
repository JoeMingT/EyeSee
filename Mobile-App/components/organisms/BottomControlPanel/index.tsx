import { ESText } from '@ESComponents/atoms';
import { Layout, Button } from '@ui-kitten/components';

const BottomControlPanel: React.FC<any> = (props) => {
  const { onButtonPress } = props;

  return (
    <Layout
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 10,
      }}
    >
      <Button>
        <ESText>Modes</ESText>
      </Button>
      <Button
        style={{ borderRadius: 50, padding: 12 }}
        size="giant"
        onPress={onButtonPress}
      ></Button>
      <Button>
        <ESText>Album</ESText>
      </Button>
    </Layout>
  );
};

export default BottomControlPanel;
