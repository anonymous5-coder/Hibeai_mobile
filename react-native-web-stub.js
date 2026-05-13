export * from 'react-native-web';
import * as RNWeb from 'react-native-web';
import { View } from 'react-native-web';

export const TurboModuleRegistry = {
  get: () => null,
  getEnforcing: () => null,
};

export const requireNativeComponent = () => null;
export const ViewPropTypes = { style: null };
export const DrawerLayoutAndroid = View;

export default {
  ...RNWeb,
  TurboModuleRegistry,
  requireNativeComponent,
  ViewPropTypes,
  DrawerLayoutAndroid,
};