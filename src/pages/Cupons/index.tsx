import React, {useCallback, useState} from 'react';

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

const Cupons: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

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
        <Cupon>
          <Top>
            <CuponTitle>25% off em todos os itens da loja</CuponTitle>
          </Top>
          <Bottom>
            <Left>
              <Info>25% OFF</Info>
              <Date>Válido até 30/12/2020</Date>
            </Left>
            <Rigth>
              <Button onPress={handleModal}>
                <ButtonText>Usar</ButtonText>
              </Button>
            </Rigth>
          </Bottom>
        </Cupon>
      </Container>
    </>
  );
};

export default Cupons;
