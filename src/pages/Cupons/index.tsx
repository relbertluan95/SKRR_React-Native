import React, {useCallback, useEffect, useState} from 'react';

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {useNavigation} from '@react-navigation/native';

import {Alert} from 'react-native';
import {
  Container,
  Header,
  HeaderIcon,
  HeaderTitle,
  Cupon,
  Top,
  CuponTitle,
  Bottom,
  Left,
  Info,
  Date,
  Rigth,
  Button,
  ButtonText,
  Modal,
  ModalContainer,
  ModalContent,
  ModalHeader,
  ModalButton,
  ModalButtonText,
} from './styles';

interface CuponsProps {
  id: string;
  title: string;
  valid: string;
  valor: string;
  useded: boolean;
}

const Cupons: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [cupons, setCupons] = useState<CuponsProps[]>([]);

  const navigation = useNavigation();

  useEffect(() => {
    async function loadData() {
      const uid = await auth().currentUser?.uid;

      await database()
        .ref(`users/${uid}/cupons`)
        .once('value')
        .then((snapshot) => {
          setCupons(snapshot.val());
          console.log(snapshot.val());
        });
    }

    loadData();
  }, []);

  const handleModal = useCallback(() => {
    setModalVisible(!modalVisible);
  }, [modalVisible]);

  const QRCode = useCallback(
    (e) => {
      if (e.data === 'SKRR') {
        setModalVisible(!modalVisible);

        Alert.alert(
          'Parabéns!!',
          'Você ganhou um desconto de 25% em qualquer item da nossa loja!',
        );
      } else {
        Alert.alert(
          'Erro',
          'Para seu desconto ser válidado, você precisa ir até a nossa loja!',
        );

        setModalVisible(!modalVisible);
      }
    },
    [modalVisible],
  );

  return (
    <>
      <Modal visible={modalVisible}>
        <ModalContainer>
          <ModalHeader>
            <ModalButton onPress={handleModal}>
              <ModalButtonText>Fechar</ModalButtonText>
            </ModalButton>
          </ModalHeader>
          <ModalContent>
            <QRCodeScanner
              onRead={(e) => QRCode(e)}
              showMarker
              checkAndroid6Permissions
              containerStyle={{
                width: 10,
                flex: 1,
              }}
              cameraStyle={{
                width: '100%',
                flex: 1,
              }}
              markerStyle={{borderColor: '#b7730e', borderRadius: 4}}
            />
          </ModalContent>
        </ModalContainer>
      </Modal>

      <Header>
        <HeaderIcon
          name="chevron-left"
          size={32}
          color="#A5A7AD"
          onPress={() => navigation.goBack()}
        />
        <HeaderTitle>Meus Cupons</HeaderTitle>
      </Header>
      <Container>
        {cupons.map((item) => (
          <Cupon key={item.id}>
            <Top>
              <CuponTitle>{item.title}</CuponTitle>
            </Top>
            <Bottom>
              <Left>
                <Info>{`${item.valor}% OFF`}</Info>
                <Date>{`Válido até ${item.valid}`}</Date>
              </Left>
              <Rigth>
                <Button onPress={handleModal}>
                  <ButtonText>Usar</ButtonText>
                </Button>
              </Rigth>
            </Bottom>
          </Cupon>
        ))}
      </Container>
    </>
  );
};

export default Cupons;
