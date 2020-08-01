import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BoxOfficeNavigator from './BoxOfficeNavigator';
import SearchNavigator from './SearchNavigator';

const Drawer = createDrawerNavigator();

function AppNavigator() {
  //name 이름은 키값이 되기 때문에 이름변경할때는 options를 이용해서 이름변경
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="BoxOfficeNavigator"
        component={BoxOfficeNavigator}
        options={{drawerLabel: '박스 오피스'}}></Drawer.Screen>
      <Drawer.Screen
        name="SearchNavigator"
        component={SearchNavigator}
        options={{drawerLabel: '영화 검색'}}></Drawer.Screen>
    </Drawer.Navigator>
  );
}

export default AppNavigator;
