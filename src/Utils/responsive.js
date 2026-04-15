import {Dimensions, PixelRatio} from 'react-native';

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const getDimensions = () => Dimensions.get('window');

export const screenWidth = () => getDimensions().width;
export const screenHeight = () => getDimensions().height;

export const wp = percentage => (screenWidth() * percentage) / 100;
export const hp = percentage => (screenHeight() * percentage) / 100;

export const scale = size => (screenWidth() / guidelineBaseWidth) * size;
export const verticalScale = size =>
  (screenHeight() / guidelineBaseHeight) * size;

export const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export const normalizeFont = size =>
  Math.round(PixelRatio.roundToNearestPixel(moderateScale(size)));
