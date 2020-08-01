import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Search from '../pages/Search';
import MovieDetail from '../pages/MovieDetail';

const Stack = createStackNavigator();

function SearchNavigator() {
  //options={{headerShown: false}} 스크린에 넣어서 부분적으로 옵션을 설정할 수 있다.
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
}

export default SearchNavigator;
