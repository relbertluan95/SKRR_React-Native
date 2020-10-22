/* eslint-disable react/jsx-closing-bracket-location */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';

import Tshirt from '../pages/Tshirt';
import Pants from '../pages/Pants';

import ProdutcDetais from '../components/ProductDetais';

const Auth = createStackNavigator();
const Tabs = createMaterialTopTabNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {backgroundColor: '#2F2E39'},
    }}
    initialRouteName="Dashboard">
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="SignUp" component={SignUp} />

    <Auth.Screen
      name="Dashboard"
      component={() => {
        return (
          <>
            <Dashboard />
            <TabsRoutes />
          </>
        );
      }}
    />

    <Auth.Screen name="ProdutcDetais" component={ProdutcDetais} />
  </Auth.Navigator>
);

const TabsRoutes: React.FC = () => (
  <Tabs.Navigator
    tabBarOptions={{
      activeTintColor: '#B7730E',
      inactiveTintColor: '#A5A7AD',
      pressColor: '#B7730E',
      tabStyle: {backgroundColor: '#33323c'},
      // scrollEnabled: true,
      labelStyle: {fontFamily: 'Gruppo-Regular', fontSize: 16},
    }}>
    <Tabs.Screen
      name="Tshirt"
      component={Tshirt}
      options={{
        title: 'Camisetas',
      }}
    />
    <Tabs.Screen
      name="Pants"
      component={Pants}
      options={{
        title: 'Calças',
      }}
    />
  </Tabs.Navigator>
);

export default AuthRoutes;
