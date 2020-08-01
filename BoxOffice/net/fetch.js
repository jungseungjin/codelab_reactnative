import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

async function fetch(url) {
  //캐싱의 유효시간등을 조절해줘야함
  try {
    let result = await AsyncStorage.getItem(url);
    if (result !== null) {
      return JSON.parse(result);
    }

    const response = await axios.get(url);

    AsyncStorage.setItem(url, JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    alert(error.message);
  }
}

export default fetch;
