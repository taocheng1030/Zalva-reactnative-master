import {
    Dimensions,
} from 'react-native';

export const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const NavNoneButton              = 0;
export const NavBackButton              = 1;
export const NavFilterButton            = 2;
export const NavOfflineButton           = 4;
export const NavCloseButton             = 8;
export const NavCloseTextButton         = 16;
export const NavMenuButton              = 32;
export const NavNotificationButton      = 64;
export const NavPinButton               = 128;