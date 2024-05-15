import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { View } from 'react-native';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Test from './screens/Test';

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <GestureHandlerRootView>
        <Test />
      </GestureHandlerRootView>
    </GluestackUIProvider>
  );
}
