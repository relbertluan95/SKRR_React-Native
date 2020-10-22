/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable no-unused-expressions */
import React, {useCallback, useRef, useEffect, useState} from 'react';
import {Alert, ActivityIndicator} from 'react-native';

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
  const [loading, setLoading] = useState(false);

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      const {email, password} = data;
      setLoading(true);

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

        await auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            navigation.navigate('Dashboard');
            setLoading(false);
          })
          .catch((error) => {
            switch (error.code) {
              case 'auth/wrong-password':
                Alert.alert(
                  'Erro na autenticação',
                  'A senha informada está incorreta!',
                );
                setLoading(false);
                break;
              case 'auth/too-many-requests':
                Alert.alert(
                  'Erro na autenticação',
                  'O acesso a esta conta foi temporariamente desativado devido a muitas tentativas de login mal sucedidas. Você pode restaurá-lo imediatamente redefinindo sua senha ou pode tentar novamente mais tarde.',
                );
                setLoading(false);
                break;
              case 'auth/user-not-found':
                Alert.alert(
                  'Erro na autenticação',
                  'O usuário informado não existe, verifique o email informado!',
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

          Alert.alert('Erro na autenticação', 'Verifique os dados informados!');

          setLoading(false);
        }
      }
    },
    [navigation],
  );

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
          {loading ? (
            <ActivityIndicator size="large" color="#a5a7ad" />
          ) : (
            'Entrar'
          )}
        </Button>
      </Form>

      <ForgotPass onPress={() => navigation.navigate('ResetPassword')}>
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
