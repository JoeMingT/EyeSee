import { config } from '@gluestack-ui/config';
import { Box, Button, GluestackUIProvider, Icon } from '@gluestack-ui/themed';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ESScreenWrapper } from '@ESComponents/atoms';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

import ViewHistoryScreen from './screens/ViewHistoryScreen';
import TakePictureScreen from './screens/TakePictureScreen';
import DisplayResultsScreen from './screens/DisplayResultsScreen';
import DownloadResultsScreen from './screens/DownloadResultsScreen';
import { RootDrawerParamList, RootStackParamList } from './types/ReactNavigationTypes';

import { AppRegistry } from 'react-native';
import { expo } from './app.json';
import PermissionsScreen from './screens/PermissionsScreen';
import UploadFilesScreen from './screens/UploadFilesScreen';
import { ImageIcon, ImagePlusIcon, UploadIcon } from 'lucide-react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
        <Stack.Navigator>
          <Stack.Screen name="Permissions" component={PermissionsScreen} />
          {/* <Stack.Screen
                name="Home"
                component={DrawerScreens}
                options={{ headerShown: false }}
              /> */}
          <Stack.Screen name="Take Picture" component={TakePictureScreen} />
          <Stack.Screen name="History" component={ViewHistoryScreen} />
          <Stack.Screen name="View Result" component={DisplayResultsScreen} />
          <Stack.Screen name="Download Result" component={DownloadResultsScreen} />
          <Stack.Screen name="Upload Files" component={UploadFilesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}

AppRegistry.registerComponent(expo.name, () => App);
