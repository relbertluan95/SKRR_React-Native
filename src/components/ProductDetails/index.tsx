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
    idArray,
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
        .on('value', (snapshot) => {
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

    await database()
      .ref(`users/${user}/favoritesNumber`)
      .once('value', (snapshot) => {
        database()
          .ref(`users/${user}/favorites/${snapshot.val()}`)
          .set({
            id,
            idArray: snapshot.val(),
            title,
            url,
            description,
            price: priceDiscount || false,
            discount: discountValue || false,
            cupon: discount || false,
          })
          .then(() => {
            database()
              .ref(`users/${user}`)
              .update({
                favoritesNumber: snapshot.val() + 1,
              });
          });
      });
  }, [description, discount, discountValue, id, priceDiscount, title, url]);

  const handleDiscount = useCallback(async () => {
    const user = auth().currentUser?.uid;

    await database()
      .ref(`coupons/${discount}`)
      .once('value')
      .then((snapshot) => {
        if (snapshot.val() === null) {
          // console.log('Cupon não encontrado!');
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

    if (cupon !== undefined) {
      await database().ref(`users/${user}/favorites/${idArray}`).update({
        price: priceDiscount,
        discount: discountValue,
        cupon: discount,
      });
    }
  }, [cupon, discount, discountValue, idArray, price, priceDiscount]);

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
      <Button
        isFavorite={favorite}
        onPress={handleFavorite}
        disabled={!!favorite}
      >
        <Icon name="heart" size={24} color="#A5A7AD" />
        <ButtonText>
          {favorite ? 'Já está na sua lista' : 'Favoritar'}
        </ButtonText>
      </Button>
    </>
  );
};

export default ProductDetails;
