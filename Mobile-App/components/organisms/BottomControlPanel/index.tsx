import { ESText } from '@ESComponents/atoms';
import { Box, Button } from '@gluestack-ui/themed';

const BottomControlPanel: React.FC<any> = (props) => {
  const { onButtonPress } = props;

  return (
    <Box
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
        onPress={onButtonPress}
      ></Button>
      <Button>
        <ESText>Album</ESText>
      </Button>
    </Box>
  );
};

export default BottomControlPanel;
