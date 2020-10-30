/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable no-unused-expressions */
import React, {useCallback, useRef, useState} from 'react';
import {Alert, ActivityIndicator} from 'react-native';

import database from '@react-native-firebase/database';
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
  const [loading, setLoading] = useState(false);

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      const {email, password, name} = data;
      setLoading(true);
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

        await auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            auth().currentUser?.updateProfile({displayName: name});

            database().ref(`users/${auth().currentUser?.uid}`).set({
              favoritesNumber: 0,
            });

            database()
              .ref(`users/${auth().currentUser?.uid}/cupons`)
              .set({
                0: {
                  id: 1,
                  ref: 0,
                  title: '25% Off em todos os itens da loja',
                  useded: false,
                  usededDate: 'n/a',
                  valid: '31/12/2020',
                  valor: 25,
                },
                1: {
                  id: 1,
                  ref: 0,
                  title: '25% Off na primeira compra',
                  useded: false,
                  usededDate: 'n/a',
                  valid: '31/12/2020',
                  valor: 25,
                },
              });

            navigation.navigate('Dashboard');
            setLoading(false);
          })
          .catch((error) => {
            switch (error.code) {
              case 'auth/email-already-in-use':
                Alert.alert(
                  'Erro ao criar conta',
                  'O email informado já existe',
                );
                setLoading(false);
                break;
              default:
                break;
            }
          });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);

          formRef.current?.setErrors(errors);

          Alert.alert('Erro ao criar conta', 'Verifique os dados informados!');

          setLoading(false);
        }
      }
    },
    [navigation],
  );

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
          {loading ? (
            <ActivityIndicator size="large" color="#a5a7ad" />
          ) : (
            'Criar conta'
          )}
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
