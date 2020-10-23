/* eslint-disable react/prop-types */
import React, {useCallback, useState} from 'react';
import {StatusBar} from 'react-native';

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  Content,
  Header,
  HeaderIcon,
  HeaderTitle,
  Image,
  Button,
  ButtonText,
  Title,
  Description,
  TextDescription,
} from './styles';

const ProductDetails: React.FC = ({route}) => {
  const {title, url, description, price, id} = route.params;
  const navigation = useNavigation();
  const [countList, setCountList] = useState<number>(0);

  const handleFavorite = useCallback(async () => {
    const user = auth().currentUser?.uid;

    await database()
      .ref(`users/${user}/favorites`)
      .once('value')
      .then((snapshot) => {
        if (snapshot.val() == null) {
          console.log('Está vazio!');

          database()
            .ref(`users/${user}/favorites/${0}`)
            .set({
              title,
              url,
              description,
              price,
            })
            .then(() => console.log('Add'))
            .catch((error) => console.log(error));
        }
        if (snapshot.val().length === 1) {
          console.log(snapshot.val().length);

          database()
            .ref(`users/${user}/favorites/${1}`)
            .set({
              title,
              url,
              description,
              price,
            })
            .then(() => console.log('Add'))
            .catch((error) => console.log(error));
        } else {
          console.log(snapshot.val().length);

          database()
            .ref(`users/${user}/favorites/${snapshot.val().length}`)
            .set({
              title,
              url,
              description,
              price,
            })
            .then(() => console.log('Add'))
            .catch((error) => console.log(error));
        }
      });
  }, [description, price, title, url]);

  return (
    <>
      <Header>
        <HeaderIcon
          name="chevron-left"
          size={32}
          color="#A5A7AD"
          onPress={() => navigation.goBack()}
        />
        <HeaderTitle>{title}</HeaderTitle>
      </Header>
      <Container>
        <StatusBar backgroundColor="#33323b" barStyle="light-content" />

        <Content>
          <Image source={{uri: url}} />

          <Title>{title}</Title>

          <Description>DESCRIÇÃO</Description>
          <TextDescription>{description}</TextDescription>
        </Content>
      </Container>
      <Button>
        <Icon name="heart" size={24} color="#A5A7AD" />
        <ButtonText onPress={handleFavorite}>Favoritar</ButtonText>
      </Button>
    </>
  );
};

export default ProductDetails;
