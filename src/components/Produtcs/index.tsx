/* eslint-disable react/jsx-closing-bracket-location */
import React from 'react';
import {ActivityIndicator} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {Container, Content, Image, Box, Footer, Title} from './styles';

interface DataProps {
  data: ProductsProps;
}

interface ProductsProps {
  id: number;
  title: string;
  description: string;
  url: string;
  price: string;
  discountPrice: string;
  cupon: string;
  discount: string;
  idArray: string;
}

const Produtcs: React.FC<DataProps> = ({data}: DataProps) => {
  const navigation = useNavigation();
  return (
    <>
      {data.id ? (
        <Container>
          <Box
            key={data.id}
            onPress={() => navigation.navigate('ProductDetails', data)}>
            <Image source={{uri: data.url}} />
            <Footer>
              <Title>{data.title}</Title>
            </Footer>
          </Box>
        </Container>
      ) : (
        <Content>
          <ActivityIndicator size={42} color="#B7730E" />
        </Content>
      )}
    </>
  );
};

export default Produtcs;
