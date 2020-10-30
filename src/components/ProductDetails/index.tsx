/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable no-useless-return */
/* eslint-disable react/prop-types */
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, StatusBar} from 'react-native';

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
  Detais,
  DetaisTop,
  Price,
  Cupon,
  CuponTextInput,
  CuponButton
} from './styles';

const ProductDetails: React.FC = ({route}) => {
  const [favorite, setFavorite] = useState<boolean>(false);
  const [discount, setDiscount] = useState();
  const [priceDiscount, setPriceDiscount] = useState();
  const [descontoEmReal, setDescontoEmReal] = useState();

  const {
    title,
    url,
    description,
    price,
    discountPrice,
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

      database()
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
            price,
            discountPrice: priceDiscount || false,
            discount: descontoEmReal || false,
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
  }, [descontoEmReal, description, discount, id, price, priceDiscount, title, url]);

  const handleDiscount = useCallback(async () => {
    await database()
      .ref(`coupons/${discount}`)
      .once('value')
      .then((snapshot) => {
        if (snapshot.val() === null) {
          Alert.alert('Erro', 'Cupom inválido!')
        } else {
          const realPrice = parseFloat(price.replace(',', '.'));
          const discountValue = snapshot.val();

          const discountInReal = (realPrice / 100) * discountValue;
          const newPrice = realPrice - discountInReal;

          setDescontoEmReal(discountInReal.toFixed(2).replace('.', ','));
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
              <Price>{`R$ ${discountPrice || priceDiscount}`}</Price>
              {/* {!favorite && (
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
              )} */}
            </DetaisTop>
          </Detais>
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
