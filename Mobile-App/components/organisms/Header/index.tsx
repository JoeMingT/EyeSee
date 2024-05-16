import { ESDivider, ESIcon, ESText } from '@ESComponents/atoms';
import { View } from 'react-native';
import { useState } from 'react';

const Header: React.FC<HeaderProps> = (props) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const toggleDrawerVisibility = () => {
    setIsDrawerVisible(!isDrawerVisible);
    console.log(`Drawer Visibility: ${isDrawerVisible}`);
  };

  return (
    <>
      <View></View>
      <ESDivider />
    </>
  );
};

export default Header;
