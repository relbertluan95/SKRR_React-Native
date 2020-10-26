import React from 'react';
import {ActivityIndicator} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {Container, Content, Button, Image, Text} from './styles';

interface DataProps {
  data: ProductsProps[];
}

interface ProductsProps {
  id: string;
  title: string;
  description: string;
  url: string;
  price: string;
  cupon: string;
  discount: string;
}

const Produtcs: React.FC<DataProps> = ({data}: DataProps) => {
  const navigation = useNavigation();
  return (
    <>
      {data ? (
        <Container>
          {data.map((item) => (
            <Button onPress={() => navigation.navigate('ProductDetails', item)}>
              <Image source={{uri: item.url}} />
            </Button>
          ))}
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
