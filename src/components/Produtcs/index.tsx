/* eslint-disable react/jsx-closing-bracket-location */
import React, {useState, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {Container, Content, Button, Image, Box} from './styles';

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
      {data ? (
        <Container>
          <Box key={data.id}>
            <Button onPress={() => navigation.navigate('ProductDetails', data)}>
              <Image source={{uri: data.url}} />
            </Button>
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
