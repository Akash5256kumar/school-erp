import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';

import * as constant from '../../../Utils/Constant';

const NewsImage = ({
  sourceUri,
  imageStyle,
  placeholderStyle,
  iconStyle,
}) => {
  const [hasError, setHasError] = useState(false);
  const hasSource = Boolean(String(sourceUri || '').trim()) && !hasError;

  useEffect(() => {
    setHasError(false);
  }, [sourceUri]);

  if (hasSource) {
    return (
      <Image
        onError={() => setHasError(true)}
        source={{uri: sourceUri}}
        style={imageStyle}
      />
    );
  }

  return (
    <View style={[styles.placeholderBase, placeholderStyle]}>
      <Image source={constant.Icons.newsIcon} style={[styles.iconBase, iconStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  placeholderBase: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBase: {
    height: constant.resW(9),
    width: constant.resW(9),
  },
});

export default React.memo(NewsImage);
