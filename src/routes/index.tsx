/* eslint-disable react/jsx-closing-bracket-location */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import auth from '@react-native-firebase/auth';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Profile from '../pages/Profile';

import Dashboard from '../pages/Dashboard';

import Tshirt from '../pages/Tshirt';
import Pants from '../pages/Pants';

import ProductDetails from '../components/ProductDetails';
import Favorites from '../pages/Favorites';

const Auth = createStackNavigator();
const Tabs = createMaterialTopTabNavigator();

const UserLogged = auth().currentUser;

console.log(UserLogged ? 'Tem usuario' : 'Não tem usuario');

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {backgroundColor: '#2F2E39'},
    }}
    // initialRouteName={UserLogged ? 'SignIn' : 'Dashboard'}
  >
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="SignUp" component={SignUp} />
    <Auth.Screen name="Profile" component={Profile} />

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

    <Auth.Screen name="ProductDetails" component={ProductDetails} />
    <Auth.Screen name="Favorites" component={Favorites} />
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
