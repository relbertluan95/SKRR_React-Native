import React from 'react';
import {StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  Content,
  Header,
  HeaderIcon,
  HeaderTitle,
  Image,
  Button,
  ButtonText,
  Title,
  Description,
  TextDescription,
} from './styles';

const ProductDetails: React.FC = ({route}) => {
  const {title, url} = route.params;
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
        <HeaderTitle>{title}</HeaderTitle>
      </Header>
      <Container>
        <StatusBar backgroundColor="#33323b" barStyle="light-content" />

        <Content>
          <Image source={{uri: url}} />

          <Title>{title}</Title>

          <Description>DESCRIÇÃO</Description>
          <TextDescription>
            A Camiseta Nike Air possui uma estampa grande e tecido de algodão
            macio para conforto o dia todo, A Camiseta Nike Air possui uma
            estampa grande e tecido de algodão macio para conforto o dia todo
          </TextDescription>

          {/* <Description>
            Descrição {'\n'}
            <TextDescription>
            A Camiseta Nike Air possui uma estampa grande e tecido de algodão macio para conforto o dia todo
            <TextDescription/>
          </Description> */}
        </Content>
      </Container>
      <Button>
        <Icon name="heart" size={24} color="#A5A7AD" />
        <ButtonText>Favoritar</ButtonText>
      </Button>
    </>
  );
};

export default ProductDetails;
