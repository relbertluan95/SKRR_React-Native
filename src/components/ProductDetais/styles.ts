import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
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

export const Icon = styled(FeatherIcon)`
  position: absolute;

  left: 0;
`;

export const Title = styled.Text`
  font-size: 36px;
  font-family: 'Gruppo-Regular';
  color: #a5a7ad;
`;

export const Image = styled.Image`
  width: 100%;
  height: 300px;

  border-radius: 4px;
`;
