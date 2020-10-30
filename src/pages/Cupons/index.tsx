import React from 'react';

import {useNavigation} from '@react-navigation/native';

import {
  Container,
  Header,
  HeaderIcon,
  HeaderTitle,
  Cupon,
  Top,
  CuponTitle,
  Bottom,
  Left,
  Info,
  Date,
  Rigth,
  Button,
  ButtonText,
} from './styles';

const Cupons: React.FC = () => {
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
        <HeaderTitle>Meus Cupons</HeaderTitle>
      </Header>
      <Container>
        <Cupon>
          <Top>
            <CuponTitle>25% off em todos os itens da loja</CuponTitle>
          </Top>
          <Bottom>
            <Left>
              <Info>25% OFF</Info>
              <Date>Válido até 30/12/2020</Date>
            </Left>
            <Rigth>
              <Button>
                <ButtonText>Usar</ButtonText>
              </Button>
            </Rigth>
          </Bottom>
        </Cupon>
      </Container>
    </>
  );
};

export default Cupons;
