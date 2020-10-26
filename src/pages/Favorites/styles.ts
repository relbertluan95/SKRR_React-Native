import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

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
  font-size: 24px;
  font-family: 'Gruppo-Regular';
  color: #a5a7ad;
`;
