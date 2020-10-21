import styled from 'styled-components/native';

import { RectButton } from 'react-native-gesture-handler'

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  background: #B7730E;
  border-radius: 10px;
  margin-top: 10px;

  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #a5a7ad;
  font-family: 'Gruppo-Regular';
  font-size: 32px;
`;


