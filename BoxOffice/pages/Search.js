import React from 'react';
import styled from 'styled-components/native';
import Title from '../components/Title';
import Row from '../components/Row';
import ListItem from '../components/ListItem';
import MovieName from '../components/MovieName';
import axios from 'axios';
import {ActivityIndicator} from 'react-native';
import {useLinkProps} from '@react-navigation/native';
import MovieDetail from '../pages/MovieDetail';

const Container = styled.SafeAreaView`
  flex: 1;
`;

const Input = styled.TextInput`
  flex: 1;
  border: 1px solid #e5e5e5;
  margin-left: 12px;
  padding: 0 12px;
`;

const Button = styled.Button``;

function Search(props) {
  const [keyword, setKeyword] = React.useState('');
  const [list, setList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const search = React.useCallback(() => {
    let url =
      'https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=ed1de2a3f8cbe24e6b4b7028862c56aa&movieNm=';
    url += keyword;
    setIsLoading(true);
    axios
      .get(url)
      .then((response) => {
        setIsLoading(false);
        setList(response.data.movieListResult.movieList);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, [keyword]);
  return (
    <Container>
      <Title>영화 검색</Title>
      <Row>
        <Input value={keyword} onChangeText={(value) => setKeyword(value)} />
        <Button title="검색" onPress={search}></Button>
      </Row>
      {isLoading ? (
        <ActivityIndicator size="large"></ActivityIndicator>
      ) : (
        list.map((item) => (
          <ListItem
            key={item.movieCd}
            onPress={() => {
              props.navigation.navigate('MovieDetail', {movieCd: item.movieCd});
            }}>
            <MovieName>{item.movieNm}</MovieName>
          </ListItem>
        ))
      )}
    </Container>
  );
}

export default Search;
