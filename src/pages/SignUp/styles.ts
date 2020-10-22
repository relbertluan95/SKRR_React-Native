import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: stretch;
  padding: 0 20px;
`;

export const Title = styled.Text`
  font-family: 'Gruppo-Regular';
  font-size: 36px;
  color: #fff;
  text-align: center;

  margin-bottom: 20%;
`;

export const Passwords = styled.View`
  margin-top: 10px;
  padding-top: 15px;
  border-top-width: 1px;
  border-top-color: #a5a7ad;
`;

export const Footer = styled.View`
  margin-top: 40px;
`;

export const FooterText = styled.Text`
  font-family: 'Gruppo-Regular';
  font-size: 24px;
  color: #eee;
`;

export const FooterButton = styled.TouchableOpacity`
  align-items: center;
`;
