/* eslint-disable react/jsx-closing-bracket-location */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Profile from '../pages/Profile';
import Cupons from '../pages/Cupons';
import ResetPassword from '../pages/ResetPassword';

import Dashboard from '../pages/Dashboard';

import Tshirt from '../pages/Products/Tshirt';
import Pants from '../pages/Products/Pants';
import Sweatshirts from '../pages/Products/Sweatshirts';
import Sneakers from '../pages/Products/Sneakers';
import Skateboard from '../pages/Products/Skateboard';
import Shorts from '../pages/Products/Shorts';

import ProductDetails from '../components/ProductDetails';
import Favorites from '../pages/Favorites';

const Auth = createStackNavigator();
const Tabs = createMaterialTopTabNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {backgroundColor: '#2F2E39'},
    }}>
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="SignUp" component={SignUp} />
    <Auth.Screen name="Profile" component={Profile} />
    <Auth.Screen name="ResetPassword" component={ResetPassword} />

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
    <Auth.Screen name="Cupons" component={Cupons} />
  </Auth.Navigator>
);

const TabsRoutes: React.FC = () => (
  <Tabs.Navigator
    tabBarOptions={{
      activeTintColor: '#B7730E',
      inactiveTintColor: '#A5A7AD',
      pressColor: '#B7730E',
      tabStyle: {backgroundColor: '#33323c'},
      scrollEnabled: true,
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
    <Tabs.Screen
      name="Sweatshirts"
      component={Sweatshirts}
      options={{
        title: 'Moletons',
      }}
    />
    <Tabs.Screen
      name="Sneakers"
      component={Sneakers}
      options={{
        title: 'Tênis',
      }}
    />
    <Tabs.Screen
      name="Skateboard"
      component={Skateboard}
      options={{
        title: 'Skates',
      }}
    />
    <Tabs.Screen
      name="Shorts"
      component={Shorts}
      options={{
        title: 'Bermudas',
      }}
    />
  </Tabs.Navigator>
);

export default AuthRoutes;
