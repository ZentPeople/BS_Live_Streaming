import React, {useRef, useState} from 'react';
import {
  TextInput,
  PermissionsAndroid,
  StyleSheet,
  View,
  Button,
  Platform,
} from 'react-native';
import {NodeCameraView} from 'react-native-nodemediaclient';

const Live = () => {
  const vb = useRef();
  const [publishBtnTitle, setPublishBtnTitle] = useState('Start Publish');
  const [isPublish, setIsPublish] = useState(false);
  const [rtempURL, setrtempURL] = useState(
    'rtmp://44.193.102.253:1935/channelA/liveA',
  );
  return (
    <View style={styles.container}>
      <NodeCameraView
        style={styles.camera}
        ref={vb}
        outputUrl={rtempURL}
        camera={{cameraId: 1, cameraFrontMirror: true}}
        audio={{bitrate: 32000, profile: 1, samplerate: 44100}}
        video={{
          preset: 12,
          bitrate: 200000,
          profile: 1,
          fps: 15,
          videoFrontMirror: false,
        }}
        autopreview={true}
      />
      <View style={styles.buttonContainer}>
        <TextInput
          value={rtempURL}
          onChangeText={setrtempURL}
          autoFocus
          style={styles.textInput}
          placeholder="Enter your stream url"
        />

        <Button
          onPress={() => {
            if (isPublish) {
              setPublishBtnTitle('Start Publish');
              setIsPublish(false);
              vb.current.stop();
            } else {
              setPublishBtnTitle('Stop Publish');
              setIsPublish(true);
              vb.current.start();
            }
          }}
          title={publishBtnTitle}
          color="#841584"
        />
      </View>
    </View>
  );
};

export default Live;

const styles = StyleSheet.create({
  container: {flex: 1, width: '100%'},
  camera: {flex: 4},
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textInput: {borderBottomWidth: 1},
});
