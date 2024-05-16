import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ESScreenWrapper } from '@ESComponents/atoms';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import ViewHistoryScreen from './screens/ViewHistoryScreen';
import TakePictureScreen from './screens/TakePictureScreen';
import DisplayResultsScreen from './screens/DisplayResultsScreen';
import DownloadResultsScreen from './screens/DownloadResultsScreen';
import { RootDrawerParamList, RootStackParamList } from './types/ReactNavigationTypes';

import { AppRegistry } from 'react-native';
import { expo } from './app.json';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootDrawerParamList>();

export default function App() {
  const DrawerScreens = () => {
    return (
      <Drawer.Navigator screenOptions={{ swipeEnabled: false }}>
        <Drawer.Screen name="Take Picture" component={TakePictureScreen} />
        <Drawer.Screen name="History" component={ViewHistoryScreen} />
      </Drawer.Navigator>
    );
  };

  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <GestureHandlerRootView>
          <ESScreenWrapper>
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={DrawerScreens}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="View Result" component={DisplayResultsScreen} />
              <Stack.Screen name="Download Result" component={DownloadResultsScreen} />
            </Stack.Navigator>
          </ESScreenWrapper>
        </GestureHandlerRootView>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}

AppRegistry.registerComponent(expo.name, () => App);
