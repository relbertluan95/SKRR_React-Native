import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 5px 10px 0;
`;

export const Header = styled.View`
  width: 100%;
  height: 60px;
  background: #33323b;
  flex-direction: row;

  justify-content: center;
  align-items: center;
`;

export const Content = styled.View`
  flex: 1;

  padding: 10px;
`;

export const HeaderIcon = styled(FeatherIcon)`
  position: absolute;

  left: 0;
`;

export const HeaderTitle = styled.Text`
  font-size: 24px;
  font-family: 'Gruppo-Regular';
  color: #a5a7ad;
`;

export const Cupon = styled.View`
  width: 100%;

  border-radius: 10px;

  background: #999;
`;
export const Top = styled.View`
  width: 100%;
  height: 50px;
  padding: 5px 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  justify-content: center;

  background: #b7730e;
`;
export const CuponTitle = styled.Text`
  font-family: 'Gruppo-Regular';
  color: #fff;
  font-size: 22px;
`;

export const Bottom = styled.View`
  width: 100%;
  height: 80px;
  padding: 5px 20px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  background: #403f47;
`;

export const Left = styled.View``;

export const Info = styled.Text`
  font-family: 'Gruppo-Regular';
  color: #eee;
  font-size: 32px;
`;

export const Date = styled.Text`
  font-family: 'Gruppo-Regular';
  color: #999;
  font-size: 18px;

  margin-top: 5px;
`;

export const Rigth = styled.View``;

export const Button = styled.TouchableOpacity`
  background: #b7730e;

  padding: 10px 15px;

  border-radius: 4px;
`;

export const ButtonText = styled.Text`
  font-family: 'Gruppo-Regular';
  color: #eee;
  font-size: 20px;
`;

// Inicio Modal
export const Modal = styled.Modal.attrs({
  animationType: 'slide',
  transparent: true,
})``;

export const ModalContainer = styled.View`
  flex: 1;

  padding: 10px;
  background: rgba(0, 0, 0, 0.7);
`;

export const ModalContent = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ModalHeader = styled.View`
  display: flex;
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ModalButton = styled.TouchableOpacity``;

export const ModalButtonText = styled.Text`
  font-family: 'Gruppo-Regular';
  color: #eee;
  font-size: 24px;
`;
