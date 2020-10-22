import React, {useCallback, useRef} from 'react';
import {StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FormHandles} from '@unform/core';
import {Form} from '@unform/mobile';
import auth from '@react-native-firebase/auth';

import Input from '../../components/Input';

import {
  Container,
  Header,
  HeaderIcon,
  HeaderTitle,
  Passwords,
  Action,
} from './styles';

const Profile: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const user = auth().currentUser;

  const handleExit = useCallback(async () => {
    await auth().signOut();

    navigation.navigate('SignIn');
  }, [navigation]);

  const handleSubmit = useCallback(() => {}, []);
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
            defaultValue={user?.displayName || undefined}
          />

          <Input
            name="email"
            placeholder="E-mail"
            icon="mail"
            defaultValue={user?.email || undefined}
          />

          <Passwords>
            <Input
              name="OldPassword"
              placeholder="Senha Atual"
              icon="lock"
              secureTextEntry
            />

            <Input
              name="NewPassword"
              placeholder="Nova senha"
              icon="lock"
              secureTextEntry
            />

            <Input
              name="ConfirmNewPassword"
              placeholder="Comfirmar nova senha"
              icon="lock"
              secureTextEntry
            />
          </Passwords>

          <Action>Atualizar Dados</Action>
        </Form>
        <Action onPress={handleExit} ButtonExit>
          Sair do App
        </Action>
      </Container>
    </>
  );
};

export default Profile;
