import React, {useRef, useState} from 'react';
import {
  TextInput,
  PermissionsAndroid,
  StyleSheet,
  View,
  Button,
  Platform,
} from 'react-native';
import {NodePlayerView} from 'react-native-nodemediaclient';

const Live = () => {
  const vb = useRef();
  const [publishBtnTitle, setPublishBtnTitle] = useState('Stop Stream');
  const [isPublish, setIsPublish] = useState(true);
  const [rtempURL, setrtempURL] = useState(
    'rtmp://44.193.102.253:1935/channelA/liveA',
  );
  return (
    <View style={styles.container}>
      <NodePlayerView
        style={styles.camera}
        ref={vb}
        inputUrl={rtempURL}
        scaleMode={'ScaleAspectFit'}
        bufferTime={300}
        maxBufferTime={1000}
        autoplay={true}
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
              setPublishBtnTitle('Start Stream');
              setIsPublish(false);
              vb.current.stop();
            } else {
              setPublishBtnTitle('Stop Stream');
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
  camera: {flex: 4, borderWidth: 1},
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textInput: {borderBottomWidth: 1},
});
