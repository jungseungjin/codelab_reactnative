/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
const options = {
  title: '이미지를 선택해주세요',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
import {
  SafeAreaView,
  StatusBar,
  Button,
  Image,
  ActivityIndicator,
} from 'react-native';
//imgur api client ID, secret
//ed99555788773f9
//7f9bf5adbcb7ec05b24add37455ac78b64b83b33
import {Colors} from 'react-native/Libraries/NewAppScreen';

const config = {
  headers: {
    Authorization: 'Client-ID ed99555788773f9',
  },
};

const App: () => React$Node = () => {
  const [url, setUrl] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Button
          title="이미지 선택"
          onPress={() => {
            setIsLoading(true);
            ImagePicker.showImagePicker(options, (response) => {
              console.log('Response = ', response);

              if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else if (response.customButton) {
                console.log(
                  'User tapped custom button: ',
                  response.customButton,
                );
              } else {
                //const source = {uri: response.uri};
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                //setUrl('data:' + response.type + ';base64,' + response.data);
                const params = new FormData();
                params.append('image', response.data);
                axios
                  .post('https://api.imgur.com/3/image', params, config)
                  .then((response) => {
                    setUrl(response.data.data.link);
                  })
                  .catch((error) => {
                    console.warn(error);
                    alert('Error:' + error.response.data.data.error);
                  })
                  .finally(() => {
                    setIsLoading(false);
                  });
              }
            });
          }}
        />
        {isLoading ? (
          <ActivityIndicator size="large"></ActivityIndicator>
        ) : (
          <>
            {url ? (
              <Image source={{uri: url}} style={{width: 340, height: 340}} />
            ) : null}
          </>
        )}
      </SafeAreaView>
    </>
  );
};

export default App;
