import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BoxOffice from '../pages/BoxOffice';
import MovieDetail from '../pages/MovieDetail';

const Stack = createStackNavigator();

function BoxOfficeNavigator() {
  //options={{headerShown: false}} 스크린에 넣어서 부분적으로 옵션을 설정할 수 있다.
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="BoxOffice" component={BoxOffice} />
      <Stack.Screen name="MovieDetail" component={MovieDetail} />
    </Stack.Navigator>
  );
}

export default BoxOfficeNavigator;
