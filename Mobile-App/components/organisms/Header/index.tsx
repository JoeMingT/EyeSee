import { ESDivider, ESIcon, ESText } from '@ESComponents/atoms';
import {
  Button,
  Card,
  Divider,
  Drawer,
  DrawerItem,
  IndexPath,
  Menu,
  MenuItem,
  Modal,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { useState } from 'react';

const Header: React.FC<HeaderProps> = (props) => {
  const { currentScreenName } = props;

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const toggleDrawerVisibility = () => {
    setIsDrawerVisible(!isDrawerVisible);
    console.log(`Drawer Visibility: ${isDrawerVisible}`);
  };

  const MenuAction = () => {
    return (
      <TopNavigationAction icon={<ESIcon name="menu"></ESIcon>} onPress={toggleDrawerVisibility} />
    );
  };

  return (
    <>
      <TopNavigation
        style={{ marginHorizontal: 10, marginVertical: 5 }}
        title={currentScreenName}
        accessoryLeft={MenuAction}
      />
      <ESDivider />
    </>
  );
};

export default Header;
