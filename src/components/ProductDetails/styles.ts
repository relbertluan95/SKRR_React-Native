import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.ScrollView`
  flex: 1;
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
  font-size: 36px;
  font-family: 'Gruppo-Regular';
  color: #a5a7ad;
`;

export const Image = styled.Image`
  width: 100%;
  height: 300px;

  border-radius: 4px;
`;

export const Button = styled(RectButton)`
  width: 100%;
  height: 60px;
  background: #b7730e;

  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-size: 26px;
  font-family: 'Gruppo-Regular';
  color: #a5a7ad;

  margin-left: 15px;
`;

export const Title = styled.Text`
  font-size: 26px;
  font-family: 'Gruppo-Regular';
  color: #a5a7ad;

  margin-top: 10px;
`;

export const Description = styled.Text`
  font-size: 22px;
  font-family: 'Gruppo-Regular';
  color: #a5a7ad;

  margin-top: 20px;
`;

export const TextDescription = styled.Text`
  font-size: 20px;
  font-family: 'Gruppo-Regular';
  color: #a5a7ad;

  text-align: center;
`;
