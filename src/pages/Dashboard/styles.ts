import styled, {css} from 'styled-components/native';

interface ScreenProps {
  userWidth: number;
}

export const Container = styled.View``;

export const Header = styled.View`
  background: #33323c;
  width: 100%;
  height: 80px;
  padding: 5px 10px;
`;

export const HeaderText = styled.Text`
  font-size: 22px;
  font-family: 'Gruppo-Regular';
  color: #fff;
`;

export const ProfileButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const Name = styled.Text.attrs({
  numberOfLines: 1,
})<ScreenProps>`
  font-size: 32px;
  font-family: 'Gruppo-Regular';
  color: #b7730e;

  margin-right: 10px;
  width: ${(props) => props.userWidth}px;
`;

export const HeaderButton = styled.TouchableOpacity``;

export const HeaderButtonText = styled.Text`
  font-size: 18px;
  font-family: 'Gruppo-Regular';
  color: #a5a7ad;
`;
