import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {Container, Button, Image, Icon} from './styles';

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
    <Container>
      {data.map((item) => (
        <Button onPress={() => navigation.navigate('ProductDetails', item)}>
          {/* <Icon
            name="heart"
            size={28}
            color="#A5A7AD"
            onPress={() => console.log(item)}
          /> */}
          <Image source={{uri: item.url}} />
        </Button>
      ))}
    </Container>
  );
};

export default Produtcs;
