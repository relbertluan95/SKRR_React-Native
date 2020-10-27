import 'react-native-gesture-handler';

import React from 'react';
import {View, StatusBar} from 'react-native';
import codePush from 'react-native-code-push';
import {NavigationContainer} from '@react-navigation/native';

import Routes from './routes';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#2F2E39" barStyle="light-content" />
      <View style={{flex: 1, backgroundColor: '#2F2E39'}}>
        <Routes />
      </View>
    </NavigationContainer>
  );
};

export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
})(App);
