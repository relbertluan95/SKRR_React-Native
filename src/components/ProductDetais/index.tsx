import React from 'react';
import {StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Container, Header, Content, Icon, Title, Image} from './styles';

const ProductDetais: React.FC = ({route}) => {
  const {title, url} = route.params;
  const navigation = useNavigation();
  return (
    <Container>
      <StatusBar backgroundColor="#33323b" barStyle="light-content" />
      <Header>
        <Icon
          name="chevron-left"
          size={32}
          color="#A5A7AD"
          onPress={() => navigation.goBack()}
        />
        <Title>{title}</Title>
      </Header>

      <Content>
        <Image source={{uri: url}} />
      </Content>
    </Container>
  );
};

export default ProductDetais;
