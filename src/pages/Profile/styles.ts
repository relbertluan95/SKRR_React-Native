import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Button from '../../components/Button';

interface ButtonProps {
  ButtonExit?: boolean;
}

export const Container = styled.ScrollView`
  flex: 1;
  padding: 10px 15px;
`;

export const Header = styled.View`
  width: 100%;
  height: 60px;
  background: #33323b;
  flex-direction: row;

  justify-content: center;
  align-items: center;
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

export const Passwords = styled.View`
  margin-top: 10px;
  padding-top: 15px;
  border-top-width: 1px;
  border-top-color: #a5a7ad;
`;

export const Action = styled(Button)<ButtonProps>`
  background: ${(props) => (props.ButtonExit ? '#970303' : '#0376B7')};
  margin-bottom: ${(props) => (props.ButtonExit ? 20 : 0)}px;
`;
