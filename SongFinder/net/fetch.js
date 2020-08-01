import Axios from 'axios';

import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

async function fetch(url) {
  let result = await AsyncStorage.getItem(url);
  let timestamp = await AsyncStorage.getItem('T' + url);
  if (result !== null) {
    //현재시간이랑 timestamp를 비교
    timestamp = Number(timestamp);
    //유닉스 타임스탬프
    const now = new Date().getTime();
    if (now - timestamp < 86400000) {
      console.log('캐시 사용됨');
      return JSON.parse(result);
    }
  }
  const response = await axios.get(url);
  result = response.data;
  AsyncStorage.setItem(url, JSON.stringify(result));
  AsyncStorage.setItem('T' + url, new Date().getTime().toString());
  return result;
}

export default fetch;
