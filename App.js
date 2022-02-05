/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {Image, View} from 'react-native';
import Camera from './components/Camera';

const App = () => {
  const [imageUrl, setImageUrl] = useState(null);

  // console.log(imageUrl);
  return (
    <>
      <Camera onPicture={imageUrl => setImageUrl(imageUrl)} />
      {/* <View>
        <Image source={imageUrl} />
      </View> */}
    </>
  );
};

export default App;
