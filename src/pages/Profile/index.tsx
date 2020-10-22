/* eslint-disable no-shadow */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable no-unused-expressions */
import React, {useCallback, useRef, useState} from 'react';
import {StatusBar, ActivityIndicator, Alert} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {FormHandles} from '@unform/core';
import {Form} from '@unform/mobile';
import auth from '@react-native-firebase/auth';
import * as Yup from 'yup';
import getValidationErros from '../../utils/getValidationErros';

import Input from '../../components/Input';

import {
  Container,
  Header,
  HeaderIcon,
  HeaderTitle,
  Passwords,
  Action,
} from './styles';

interface EditFormData {
  password: string;
  ConfirmNewPassword: string;
}

const Profile: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const user = auth().currentUser;

  const handleExit = useCallback(async () => {
    await auth().signOut();

    navigation.navigate('SignIn');
  }, [navigation]);

  const handleSubmit = useCallback(async (data: EditFormData) => {
    const {password} = data;
    setLoading(true);
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
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
        .currentUser?.updatePassword(password)
        .then(() => {
          Alert.alert(
            'Senha atualizada',
            'Sua senha foi alterada com sucesso!',
          );
          setLoading(false);
        })
        .catch((error) => {
          // error
          switch (error.code) {
            case 'auth/requires-recent-login':
              Alert.alert(
                'Erro',
                'Faça login novamente antes de tentar novamente esta solicitação.',
              );
              setLoading(false);
              break;
            default:
              break;
          }
          setLoading(false);
        });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErros(err);

        formRef.current?.setErrors(errors);

        Alert.alert('Erro ao editar', 'Verifique os dados informados');

        setLoading(false);
      }
    }
  }, []);

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
        <HeaderTitle>Meu Perfil</HeaderTitle>
      </Header>
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="name"
            placeholder="Nome"
            icon="user"
            value={user?.displayName || undefined}
          />

          <Input
            name="email"
            placeholder="E-mail"
            icon="mail"
            value={user?.email || undefined}
          />

          <Passwords>
            <Input
              name="password"
              placeholder="Nova senha"
              icon="lock"
              secureTextEntry
            />

            <Input
              name="confirmPassword"
              placeholder="Confirmar nova senha"
              icon="lock"
              secureTextEntry
            />
          </Passwords>

          <Action
            onPress={() => {
              formRef.current?.submitForm();
            }}>
            {loading ? (
              <ActivityIndicator size="large" color="#a5a7ad" />
            ) : (
              'Alterar dados'
            )}
          </Action>
        </Form>
        <Action onPress={handleExit} ButtonExit>
          Sair do App
        </Action>
      </Container>
    </>
  );
};

export default Profile;
