import React from 'react';

import {Container, Button, Image} from './styles';

interface DataProps {
  data: ProductsProps[];
}

interface ProductsProps {
  title: string;
  url: string;
}

const Produtcs: React.FC<DataProps> = ({data}: DataProps) => {
  console.log(data.map((item) => item.title));
  return (
    <Container>
      {data.map((item) => (
        <Button>
          <Image source={{uri: item.url}} />
        </Button>
      ))}
    </Container>
  );
};

export default Produtcs;
