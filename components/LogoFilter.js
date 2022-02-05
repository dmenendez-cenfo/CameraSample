import React, {useEffect, useRef} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {useState} from 'react/cjs/react.development';
const images = [
  require('./img/logo-angular.png'),
  require('./img/logo-ember.png'),
  require('./img/logo-node.png'),
  require('./img/logo-python.png'),
  require('./img/logo-react-native.png'),
  require('./img/logo-react.png'),
  require('./img/logo-ruby-on-rails.png'),
  require('./img/logo-vue.png'),
];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const LogoFilter = props => {
  const [currentImage, setCurrentImage] = useState(0);

  const alive = useRef(true);
  useEffect(() => {
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        alive.current && setCurrentImage(randomInt(0, images.length));
      }, 100 * i);
    }

    return () => (alive.current = false);
  });

  return (
    <View style={styles.filter(props)}>
      <Image source={images[currentImage]} />
    </View>
  );
};

const styles = StyleSheet.create({
  filter: function ({width, height, x, y, yawAngle, rollAngle}) {
    return {
      position: 'absolute',
      top: y - height,
      left: x,
      width,
      height,
      transform: [{rotateX: `${yawAngle}deg`}, {rotateY: `${-rollAngle}deg`}],
    };
  },
});

export default LogoFilter;
