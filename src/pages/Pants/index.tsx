import React from 'react';

import Products from '../../components/Produtcs';

import {Container} from './styles';

const data = [
  {
    title: 'calca_1',
    url:
      'https://assets.xtechcommerce.com/uploads/images/medium/851b6d5ed993d89cebe9907c304886ca.jpg',
  },
  {
    title: 'calca',
    url:
      'https://cdn.shopify.com/s/files/1/2802/3244/products/calca-independent-sarja-reat-confort-211972.jpg?v=1576101447',
  },
  {
    title: 'calca',
    url:
      'https://static.dafiti.com.br/p/adidas-Skateboarding-Cal%C3%A7a-adidas-Skateboarding-Jogger-Wind-Standard-Preta-5942-5698315-1-zoom.jpg',
  },
];

const Pants: React.FC = () => {
  return (
    <Container>
      <Products data={data} />
    </Container>
  );
};

export default Pants;
