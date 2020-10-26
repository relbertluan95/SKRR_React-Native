import styled, {css} from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {RectButton} from 'react-native-gesture-handler';

interface ButtonProps {
  isFavorite?: boolean;
}

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

export const Button = styled(RectButton)<ButtonProps>`
  width: 100%;
  height: 60px;
  background: #b7730e;

  flex-direction: row;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.isFavorite &&
    css`
      background: #0376b7;
    `}
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

export const Detais = styled.View`
  width: 100%;
`;
export const DetaisTop = styled.View`
  flex-direction: row;

  justify-content: space-between;
  align-items: center;
`;
export const Price = styled.Text`
  font-family: 'Gruppo-Regular';
  font-size: 36px;
  color: #b7730e;
`;
export const Cupon = styled.View`
  background: #403f47;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border-radius: 10px;
`;
export const CuponTextInput = styled.TextInput`
  width: 120px;

  font-family: 'Gruppo-Regular';
  font-size: 18px;
`;
export const CuponButton = styled.TouchableOpacity`
  background: #b7730e;
  padding: 8px;

  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;
export const Message = styled.Text`
  text-align: center;
  color: #a5a7ad;
  font-family: 'Gruppo-Regular';
  font-size: 18px;

  margin-top: 8px;
`;
