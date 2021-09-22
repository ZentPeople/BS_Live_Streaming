import React, {useEffect, useState} from 'react';

import {
  StyleSheet,
  View,
  PermissionsAndroid,
  Button,
  Platform,
} from 'react-native';

import Live from './src/Screens/Live';
import Stream from './src/Screens/Stream';

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple(
      [
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ],
      {
        title: 'Cool Photo App Camera And Microphone Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const App = () => {
  useEffect(() => {
    Platform.OS === 'android' && requestCameraPermission();
  }, []);

  const [screen, setScreen] = useState(0);

  return (
    <View style={styles.container}>
      {screen === 1 && <Stream />}
      {screen === 2 && <Live />}
      <View style={styles.buttonContainer}>
        <Button title="Stream" onPress={() => setScreen(1)} />
        <Button title="Live" onPress={() => setScreen(2)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    paddingHorizontal: 100,
    paddingVertical: 10,
  },
});

export default App;
