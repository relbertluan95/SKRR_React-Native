/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable no-unused-expressions */
import React, {useCallback, useRef, useEffect} from 'react';
import {Alert} from 'react-native';

import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';
import {FormHandles} from '@unform/core';
import {Form} from '@unform/mobile';

import getValidationErros from '../../utils/getValidationErros';

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

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const handleSignIn = useCallback(async (data: SignInFormData) => {
    const {email, password} = data;
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Email inválido')
          .required('O email e obrigatório'),
        password: Yup.string().min(
          6,
          'Senha obrigatório, minino de 6 caracteres',
        ),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('Dashboard');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErros(err);

        formRef.current?.setErrors(errors);

        Alert.alert('Erro na autenticação', 'Verifique os dados informados!');
      }
    }
  }, []);

  useEffect(() => {
    async function loadUser() {
      const user = await auth().currentUser;

      if (user) {
        navigation.navigate('Dashboard');
      }
    }
    loadUser();
  }, [navigation]);

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
