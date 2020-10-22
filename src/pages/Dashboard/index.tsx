import React from 'react';
import {StatusBar} from 'react-native';

import {
  Container,
  Header,
  HeaderText,
  Name,
  HeaderButton,
  HeaderButtonText,
} from './styles';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <StatusBar backgroundColor="#33323c" barStyle="light-content" />
      <Header>
        <HeaderText>
          Seja bem vindo,
          {'\n'}
          <Name>Relbert Luan</Name>
        </HeaderText>
        <HeaderButton>
          <HeaderButtonText>Meus Favoritos</HeaderButtonText>
        </HeaderButton>
      </Header>
    </Container>
  );
};

export default Dashboard;
