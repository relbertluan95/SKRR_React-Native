import React, {useEffect, useState} from 'react';
import {StatusBar, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';

import {
  Container,
  Header,
  HeaderText,
  ProfileButton,
  Name,
  HeaderButton,
  HeaderButtonText,
} from './styles';

const Dashboard: React.FC = () => {
  const navigation = useNavigation();
  const [userWidth, setUserWidth] = useState<number>(0);
  const user = auth().currentUser;

  useEffect(() => {
    function loadDimensions() {
      const {width} = Dimensions.get('screen');

      setUserWidth(width - 80);
    }

    loadDimensions();
  }, []);

  return (
    <Container>
      <StatusBar backgroundColor="#33323c" barStyle="light-content" />
      <Header>
        <HeaderText>
          Seja bem vindo,
          {'\n'}
          <ProfileButton onPress={() => navigation.navigate('Profile')}>
            <Name userWidth={userWidth}>{user?.displayName}</Name>
            <Icon name="edit" size={14} color="#eee" />
          </ProfileButton>
        </HeaderText>
        <HeaderButton onPress={() => navigation.navigate('Favorites')}>
          <HeaderButtonText>Meus Favoritos</HeaderButtonText>
        </HeaderButton>
      </Header>
    </Container>
  );
};

export default Dashboard;
