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
}

const Pants: React.FC = () => {
  const [data, setData] = useState<DataProps[]>([]);

  useEffect(() => {
    async function loadData() {
      await database()
        .ref('/products/calcas')
        .once('value')
        .then((snapshot) => {
          setData(snapshot.val());
        })
        .catch((error) => {
          console.log(error);
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

export default Pants;
