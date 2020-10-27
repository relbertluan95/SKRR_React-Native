import React, {useEffect, useState} from 'react';

import database from '@react-native-firebase/database';

import Products from '../../components/Produtcs';

import {Container, List} from './styles';

interface DataProps {
  id: string;
  title: string;
  description: string;
  url: string;
  price: string;
  discountPrice: string;
  cupon: string;
  discount: string;
  idArray: string;
}

const Tshirt: React.FC = () => {
  const [data, setData] = useState<DataProps[]>([]);

  useEffect(() => {
    async function loadData() {
      await database()
        .ref('/products/tshirt')
        .on('value', (snapshot) => {
          setData(snapshot.val());
        });
    }

    loadData();
  }, []);

  return (
    <Container>
      <List
        keyExtractor={(item) => String(item.id)}
        data={data}
        renderItem={({item}) => <Products data={item} />}
      />
    </Container>
  );
};

export default Tshirt;
