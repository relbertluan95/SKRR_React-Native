/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable no-unused-expressions */
import React, {useCallback, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';

import {FormHandles} from '@unform/core';
import {Form} from '@unform/mobile';

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
  FooterButtonText,
} from './styles';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const handleSignIn = useCallback((data: object) => {
    console.log(data);
  }, []);

  return (
    <Container>
      <Title>SKRR</Title>

      <Form ref={formRef} onSubmit={handleSignIn}>
        <Input
          name="email"
          icon="mail"
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          name="password"
          icon="lock"
          placeholder="Senha"
          secureTextEntry
        />

        <Button
          onPress={() => {
            formRef.current?.submitForm();
          }}>
          Entrar
        </Button>
      </Form>

      <ForgotPass>
        <ForgotPassText>Esqueci minha senha</ForgotPassText>
      </ForgotPass>

      <Footer>
        <FooterText>Ainda não tem conta?</FooterText>
        <FooterButton onPress={() => navigation.navigate('SignUp')}>
          <FooterButtonText>Criar conta</FooterButtonText>
        </FooterButton>
      </Footer>
    </Container>
  );
};

export default SignIn;
