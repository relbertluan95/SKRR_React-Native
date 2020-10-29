import styled from 'styled-components/native';

export const Container = styled.ScrollView``;

export const Content = styled.View`
  flex: 1;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Box = styled.TouchableOpacity`
  width: 100%;
  height: 250px;

  padding: 5px;

  border-radius: 4px;
`;

export const Image = styled.Image`
  width: 100%;
  height: 250px;

  border-radius: 4px;
`;

export const Footer = styled.View`
  width: 100%;
  height: 30px;

  justify-content: center;
  align-items: center;

  position: absolute;
  bottom: 0;

  margin-left: 5px;
  padding: 5px;

  background: rgba(51, 50, 59, 0.9);
`;

export const Title = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-size: 14px;
  font-family: 'Gruppo-Regular';
  color: #b7730e;

  width: 100%;
  text-align: center;
`;
