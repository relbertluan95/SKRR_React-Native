import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: stretch;
  padding: 0 20px;
`;

export const Title = styled.Text`
  font-family: 'Gruppo-Regular';
  font-size: 64px;
  color: #ffffff;

  margin-bottom: 20px;
  text-align: center;
`;

export const ForgotPass = styled.TouchableOpacity`
  margin-top: 8px;

  align-items: flex-end;
`;

export const ForgotPassText = styled.Text`
  font-family: 'Gruppo-Regular';
  font-size: 16px;
  color: #eee;
`;

export const Footer = styled.View`
  margin-top: 40px;
`;

export const FooterText = styled.Text`
  font-family: 'Gruppo-Regular';
  font-size: 24px;
  color: #eee;

  text-align: center;
`;

export const FooterButton = styled.TouchableOpacity`
  align-items: center;
`;

export const FooterButtonText = styled.Text`
  font-family: 'Gruppo-Regular';
  font-size: 22px;
  color: #b7730e;
`;
