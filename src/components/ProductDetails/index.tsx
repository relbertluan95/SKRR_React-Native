/* eslint-disable no-useless-return */
/* eslint-disable react/prop-types */
import React, {useCallback, useEffect, useState} from 'react';
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
  Detais,
  DetaisTop,
  Price,
  Cupon,
  CuponTextInput,
  CuponButton,
  Message,
} from './styles';

const ProductDetails: React.FC = ({route}) => {
  const [favorite, setFavorite] = useState<boolean>(false);
  const [discount, setDiscount] = useState();
  const [priceDiscount, setPriceDiscount] = useState();
  const [discountValue, setDiscountValue] = useState();

  const {
    title,
    url,
    description,
    price,
    id,
    cupon,
    discount: discountSelected,
  } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    function loadPriceFormated() {
      setPriceDiscount(price);
    }

    async function loadFavorite() {
      const user = auth().currentUser?.uid;
      await database()
        .ref(`users/${user}/favorites`)
        .orderByChild('id')
        .equalTo(id)
        .once('value')
        .then((snapshot) => {
          if (snapshot.val() !== null) {
            setFavorite(true);
          }
        });
    }
    loadFavorite();
    loadPriceFormated();
  }, [id, price]);

  const handleFavorite = useCallback(async () => {
    const user = auth().currentUser?.uid;

    if (favorite === false) {
      await database()
        .ref(`users/${user}/favorites`)
        .once('value')
        .then((snapshot) => {
          if (snapshot.val() == null) {
            console.log('Está vazio!');

            database()
              .ref(`users/${user}/favorites/${0}`)
              .set({
                id,
                title,
                url,
                description,
                price: priceDiscount || false,
                discount: discountValue || false,
                cupon: discount || false,
              })
              .then(() => console.log('Add'))
              .catch((error) => console.log(error));
          }
          if (snapshot.val().length === 1) {
            console.log(snapshot.val().length);

            database()
              .ref(`users/${user}/favorites/${1}`)
              .set({
                id,
                title,
                url,
                description,
                price: priceDiscount || price,
                discount: discountValue || 'false',
                cupon: discount,
              })
              .then(() => console.log('Add'))
              .catch((error) => console.log(error));
          } else {
            console.log(snapshot.val().length);

            database()
              .ref(`users/${user}/favorites/${snapshot.val().length}`)
              .set({
                id,
                title,
                url,
                description,
                price: priceDiscount || price,
                discount: discountValue || 'false',
                cupon: discount,
              })
              .then(() => console.log('Add'))
              .catch((error) => console.log(error));
          }
        });
    } else return;
  }, [
    description,
    discount,
    discountValue,
    favorite,
    id,
    price,
    priceDiscount,
    title,
    url,
  ]);

  const handleDiscount = useCallback(async () => {
    await database()
      .ref(`coupons/${discount}`)
      .once('value')
      .then((snapshot) => {
        if (snapshot.val() === null) {
          console.log('Cupon não encontrado!');
        } else {
          const realPrice = parseFloat(price.replace(',', '.'));
          const discountValue = snapshot.val();

          const discountInReal = (realPrice / 100) * discountValue;
          const newPrice = realPrice - discountInReal;

          setDiscountValue(discountInReal.toFixed(2).replace('.', ','));
          setPriceDiscount(newPrice.toFixed(2).replace('.', ','));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [discount, price]);
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

          <Detais>
            <DetaisTop>
              <Price>{`R$ ${priceDiscount}`}</Price>
              <Cupon>
                <CuponTextInput
                  placeholder="CUPON"
                  placeholderTextColor="#A5A7AD"
                  onChangeText={(value) => setDiscount(value)}
                  autoCapitalize="characters"
                  defaultValue={cupon || ''}
                />
                <CuponButton onPress={handleDiscount}>
                  <Icon name="check" color="#eee" size={32} />
                </CuponButton>
              </Cupon>
            </DetaisTop>
            <Message>
              {discountValue || cupon
                ? `Você ganhou R$ ${
                    discountValue || discountSelected
                  } de desconto!!`
                : ''}
            </Message>
          </Detais>

          <Description>DESCRIÇÃO</Description>
          <TextDescription>{description}</TextDescription>
        </Content>
      </Container>
      <Button disallowInterruption isFavorite={favorite}>
        <Icon name="heart" size={24} color="#A5A7AD" />
        <ButtonText onPress={handleFavorite}>
          {favorite ? 'Já está na sua lista' : 'Favoritar'}
        </ButtonText>
      </Button>
    </>
  );
};

export default ProductDetails;
