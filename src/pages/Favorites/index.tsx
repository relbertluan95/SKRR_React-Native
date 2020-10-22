import React from 'react';
import {StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Container, Header, HeaderIcon, HeaderTitle} from './styles';

const Favorites: React.FC = () => {
  const navigation = useNavigation();
  return (
    <>
      <Header>
        <HeaderIcon
          name="chevron-left"
          size={32}
          color="#A5A7AD"
          onPress={() => navigation.goBack()}
        />
        <HeaderTitle>Meus Favoritos</HeaderTitle>
      </Header>
      <Container>
        <StatusBar backgroundColor="#33323b" barStyle="light-content" />
      </Container>
    </>
  );
};

export default Favorites;
