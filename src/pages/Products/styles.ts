import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #2f2e39;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {padding: 5},
  horizontal: false,
  numColumns: 2,
})``;
