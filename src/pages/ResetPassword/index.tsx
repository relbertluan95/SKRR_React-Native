/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable no-unused-expressions */
import React, {useRef, useCallback, useState} from 'react';
import {StatusBar, Alert, ActivityIndicator} from 'react-native';

import {FormHandles} from '@unform/core';
import {Form} from '@unform/mobile';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {Container, Header, HeaderTitle, HeaderIcon, Title} from './styles';

interface DataProps {
  email: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const resetPassword = useCallback(
    async (data: DataProps) => {
      const {email} = data;
      setLoading(true);
      Alert.alert(
        'Sucesso ao recuperar senha',
        'Enviamos um email para você, cheque seus email!',
      );
      navigation.goBack();
      await auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          // Sucess
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);

          switch (error.code) {
            case 'auth/invalid-email':
              Alert.alert('Erro', 'O formato do email não e válido');
              setLoading(false);
              break;
            case 'auth/user-not-found':
              Alert.alert('Erro', 'O email informado não existe');
              setLoading(false);
              break;

            default:
              break;
          }
        });
    },
    [navigation],
  );

  return (
    <>
      <StatusBar backgroundColor="#33323b" barStyle="light-content" />
      <Header>
        <HeaderIcon
          name="chevron-left"
          size={32}
          color="#A5A7AD"
          onPress={() => navigation.goBack()}
        />
        <HeaderTitle>Meus Favoritos</HeaderTitle>
      </Header>
      <Container>
        <Title>Informe seu email</Title>

        <Form ref={formRef} onSubmit={resetPassword}>
          <Input
            name="email"
            icon="mail"
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
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
      </Container>
    </>
  );
};

export default ResetPassword;
