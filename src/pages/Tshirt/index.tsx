import React from 'react';

import Products from '../../components/Produtcs';

import {Container} from './styles';

const data = [
  {
    title: 'camiseta_1',
    url:
      'https://static.netshoes.com.br/produtos/camiseta-nike-fran-swoosh-masculina/14/HZM-3651-014/HZM-3651-014_zoom1.jpg?ts=1585331283',
  },
  {
    title: 'camiseta_2',
    url:
      'https://images.lojanike.com.br/1024x1024/produto/9525_1762430_20191025114407.png',
  },
  {
    title: 'camiseta_3',
    url:
      'https://img.elo7.com.br/product/zoom/27EAA90/camiseta-preta-nike-manga-curta-camiseta-nike.jpg',
  },
];

const Tshirt: React.FC = () => {
  return (
    <Container>
      <Products data={data} />
    </Container>
  );
};

export default Tshirt;
