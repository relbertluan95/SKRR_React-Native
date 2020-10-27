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
  cupon: string;
  discount: string;
}

const Shorts: React.FC = () => {
  const [data, setData] = useState<DataProps[]>([]);

  useEffect(() => {
    async function loadData() {
      await database()
        .ref('/products/shorts')
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

export default Shorts;
