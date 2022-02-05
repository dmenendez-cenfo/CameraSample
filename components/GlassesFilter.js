import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
const glassesImage = require('./img/glasses.png');

const GlassesFilter = ({
  rightEyePosition,
  leftEyePosition,
  yawAngle,
  rollAngle,
}) => {
  return (
    <View
      style={styles.glasses({
        rightEyePosition,
        leftEyePosition,
        yawAngle,
        rollAngle,
      })}>
      <Image source={glassesImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  glasses: ({rightEyePosition, leftEyePosition, yawAngle, rollAngle}) => {
    const width = Math.abs(leftEyePosition.x - rightEyePosition.x) - 100;
    return {
      position: 'absolute',
      top: rightEyePosition.y,
      left: rightEyePosition.x,
      resizeMode: 'contain',
      width,
      transform: [{rotateX: `${yawAngle}deg`}, {rotateY: `${-rollAngle}deg`}],
    };
  },
});

export default GlassesFilter;
