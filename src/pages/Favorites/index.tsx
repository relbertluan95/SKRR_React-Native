import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import Products from '../../components/Produtcs';

import {Container, Header, HeaderIcon, HeaderTitle, List} from './styles';

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

const Favorites: React.FC = () => {
  const navigation = useNavigation();
  const [data, setData] = useState<DataProps[]>([]);

  useEffect(() => {
    async function loadData() {
      const user = await auth().currentUser?.uid;

      await database()
        .ref(`users/${user}/favorites`)
        .on('value', (snapshot) => {
          setData(snapshot.val());
        });
    }

    loadData();
  }, [data]);

  return (
    <>
      <Header>
        <HeaderIcon
          name="chevron-left"
          size={32}
          color="#A5A7AD"
          onPress={() => navigation.goBack()}
        />
        <HeaderTitle>Meus Favoritos</HeaderTitle>
      </Header>
      <Container>
        <StatusBar backgroundColor="#33323b" barStyle="light-content" />
        <List
          keyExtractor={(item) => String(item.id)}
          data={data}
          renderItem={({item}) => <Products data={item} />}
        />
      </Container>
    </>
  );
};

export default Favorites;
