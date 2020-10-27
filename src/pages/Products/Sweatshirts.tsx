import React, {useEffect, useState} from 'react';

import database from '@react-native-firebase/database';

import Products from '../../components/Produtcs';

import {Container} from './styles';

interface DataProps {
  id: string;
  title: string;
  description: string;
  url: string;
  price: string;
  cupon: string;
  discount: string;
}

const Sweatshirts: React.FC = () => {
  const [data, setData] = useState<DataProps[]>([]);

  useEffect(() => {
    async function loadData() {
      await database()
        .ref('/products/sweatshirts')
        .on('value', (snapshot) => {
          setData(snapshot.val());
        });
    }

    loadData();
  }, []);

  return (
    <Container>
      <Products data={data} />
    </Container>
  );
};

export default Sweatshirts;
