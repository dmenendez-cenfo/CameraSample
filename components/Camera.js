import React, {useRef, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';
import GlassesFilter from './GlassesFilter';
import Filters from './LogoFilter';

const Camera = ({onPicture}) => {
  const camera = useRef();
  const [takingPicture, setTakingPicture] = useState(false);
  const [face, setFace] = useState(null);
  const [eyes, setEyes] = useState(null);

  const takePicture = async () => {
    if (camera && !takingPicture) {
      setTakingPicture(true);
      try {
        const options = {
          quality: 0.85,
          fixOrientation: true,
          forceOrientation: true,
        };
        const data = await camera.current.takePictureAsync(options);
        Alert.alert('Success', JSON.stringify(data));
        onPicture(data.uri);
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally {
        setTakingPicture(false);
      }
    }
  };

  const onFaceDetected = ({faces}) => {
    if (faces[0]) {
      setFace({
        width: faces[0].bounds.size.width,
        height: faces[0].bounds.size.height,
        x: faces[0].bounds.origin.x,
        y: faces[0].bounds.origin.y,
        yawAngle: faces[0].yawAngle,
        rollAngle: faces[0].rollAngle,
      });
      setEyes({
        rightEyePosition: faces[0].rightEyePosition,
        leftEyePosition: faces[0].leftEyePosition,
      });
    } else {
      setFace(null);
      setEyes(null);
    }
  };

  console.log(eyes);

  return (
    <RNCamera
      ref={ref => (camera.current = ref)}
      captureAudio={false}
      style={{flex: 1}}
      type={RNCamera.Constants.Type.front}
      androidCameraPermissionOptions={{
        title: 'Permissions to use camera',
        message: 'We need to use the camera',
        buttonPositive: 'OK',
        buttonNegative: 'Cancel',
      }}
      onFacesDetected={onFaceDetected}
      faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.btnAlignment}
        onPress={takePicture}>
        {/* <Icon name="camera" size={50} color="#fff" /> */}
        <Text>Take picture</Text>
      </TouchableOpacity>
      {face && <Filters {...face} />}
      {eyes && eyes.leftEyePosition && eyes.rightEyePosition && (
        <GlassesFilter
          rightEyePosition={eyes.rightEyePosition}
          leftEyePosition={eyes.leftEyePosition}
          rollAngle={face.rollAngle}
          yawAngle={face.yawAngle}
        />
      )}
    </RNCamera>
  );
};

const styles = StyleSheet.create({
  btnAlignment: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default Camera;
