import React, { useCallback, useRef } from 'react';
import { useNavigation } from '@react-navigation/native'

import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Title,
  Passwords,
  Footer,
  FooterText,
  FooterButton,
} from './styles';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const handleSignUp = useCallback((data: object) => {
    console.log(data)
  }, [])

  return (
    <Container>
      <Title>Cadastra-se</Title>

      <Form ref={formRef} onSubmit={handleSignUp}>
        <Input
          name="name"
          icon="user"
          placeholder="Nome Completo"
          autoCapitalize='words'
          autoCorrect={false}
        />

        <Input
          name="email"
          icon="mail"
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize='none'
          autoCorrect={false}
        />

        <Passwords>
          <Input
            name="password"
            icon="lock"
            placeholder="Senha"

          />

          <Input
            name="comfirm-password"
            icon="lock"
            placeholder="Confirmar senha"

          />
        </Passwords>

        <Button onPress={() => {
          formRef.current?.submitForm();
        }}>Criar conta</Button>
      </Form>

      <Footer>
        <FooterButton>
          <FooterText onPress={() => navigation.goBack()} >Já tenho conta!</FooterText>
        </FooterButton>
      </Footer>
    </Container>
  );
}

export default SignUp;
