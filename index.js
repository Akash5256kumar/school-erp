/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';

import {Text,TextInput,Image,View,LogBox} from 'react-native'
import {name as appName} from './app.json';
LogBox.ignoreLogs(['VirtualizedList: You have a large list that is slow to update']);
LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews']);
LogBox.ignoreAllLogs(true)
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
Image.defaultProps = Image.defaultProps || {};
Image.defaultProps.allowFontScaling = false;
View.defaultProps = View.defaultProps || {};
View.defaultProps.allowFontScaling=false;
AppRegistry.registerComponent(appName, () => App);
