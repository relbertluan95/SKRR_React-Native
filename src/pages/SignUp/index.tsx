/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable no-unused-expressions */
import React, {useCallback, useRef} from 'react';
import {Alert} from 'react-native';

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
  Passwords,
  Footer,
  FooterText,
  FooterButton,
} from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const handleSignUp = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string()
          .email('Email inválido')
          .required('O email e obrigatório'),
        password: Yup.string().min(
          6,
          'Senha obrigatório, minino de 6 caracteres',
        ),
        confirmPassword: Yup.string().when('password', (password, field) =>
          password ? field.required().oneOf([Yup.ref('password')]) : field,
        ),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      /* await signIn({
          register: data.register,
        }); */
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErros(err);

        formRef.current?.setErrors(errors);

        Alert.alert('Erro na autenticação', 'Verifique os dados informados!');
      }
    }
  }, []);

  return (
    <Container>
      <Title>Cadastra-se</Title>

      <Form ref={formRef} onSubmit={handleSignUp}>
        <Input
          name="name"
          icon="user"
          placeholder="Nome Completo"
          autoCapitalize="words"
          autoCorrect={false}
        />

        <Input
          name="email"
          icon="mail"
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Passwords>
          <Input
            name="password"
            icon="lock"
            placeholder="Senha"
            secureTextEntry
          />

          <Input
            name="confirmPassword"
            icon="lock"
            placeholder="Confirmar senha"
            secureTextEntry
          />
        </Passwords>

        <Button
          onPress={() => {
            formRef.current?.submitForm();
          }}>
          Criar conta
        </Button>
      </Form>

      <Footer>
        <FooterButton>
          <FooterText onPress={() => navigation.goBack()}>
            Já tenho conta!
          </FooterText>
        </FooterButton>
      </Footer>
    </Container>
  );
};

export default SignUp;
