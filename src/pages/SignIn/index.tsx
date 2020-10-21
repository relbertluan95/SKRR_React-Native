import React from 'react';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Title,
  ForgotPass,
  ForgotPassText,
  Footer,
  FooterText,
  FooterButton,
  FooterButtonText
} from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Title>SKRR</Title>

      <Input name="email" icon="mail" placeholder="E-mail" />
      <Input name="password" icon="lock" placeholder="Senha" />

      <Button>Entrar</Button>
      <ForgotPass>
        <ForgotPassText>Esqueci minha senha</ForgotPassText>
      </ForgotPass>

      <Footer>
        <FooterText>Ainda não tem conta?</FooterText>
        <FooterButton>
          <FooterButtonText>Criar conta</FooterButtonText>
        </FooterButton>
      </Footer>
    </Container>
  );
}

export default SignIn;
