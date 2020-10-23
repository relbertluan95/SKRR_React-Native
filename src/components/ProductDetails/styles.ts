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

  align-items: center;
`;

export const Content = styled.View`
  flex: 1;

  padding: 10px;
`;

export const HeaderIcon = styled(FeatherIcon)``;

export const HeaderTitle = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 24px;
  font-family: 'Gruppo-Regular';
  color: #a5a7ad;

  margin: 0 15px;
  width: 80%;
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
  font-size: 24px;
  font-family: 'Gruppo-Regular';
  color: #a5a7ad;

  margin-top: 10px;
`;

export const Description = styled.Text`
  font-size: 20px;
  font-family: 'Gruppo-Regular';
  color: #a5a7ad;

  margin-top: 10px;
`;

export const TextDescription = styled.Text`
  font-size: 18px;
  font-family: 'Gruppo-Regular';
  color: #a5a7ad;

  text-align: center;
`;
