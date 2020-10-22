import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const Container = styled.ScrollView``;

export const Button = styled.TouchableOpacity``;

export const Image = styled.Image`
  width: 100%;
  height: 250px;

  z-index: 5;

  position: relative;
  top: 0;
  left: 0;
`;

export const Icon = styled(FeatherIcon)`
  position: absolute;
  top: 5px;
  left: 5px;

  z-index: 10;
`;
