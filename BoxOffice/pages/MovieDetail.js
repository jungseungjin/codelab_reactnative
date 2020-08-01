import React from 'react';
import styled from 'styled-components/native';
import axios from 'axios';
import {ActivityIndicator} from 'react-native';
import moment from 'moment';
import fetch from '../net/fetch';

const Container = styled.SafeAreaView`
  flex: 1;
`;
const Contents = styled.ScrollView`
  flex: 1;
`;
const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin: 12px;
`;

const Description = styled.Text`
  font-size: 18px;
  margin: 4px 12px;
  line-height: 28px;
`;
const Back = styled.TouchableOpacity`
  height: 50px;
  padding: 12px;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
`;

const BackLabel = styled.Text`
  font-size: 18px;
  color: #0000cc;
  justify-content: center;
`;

const Header = styled.View`
  height: 50px;
  border-bottom-color: #e5e5e5;
  border-bottom-width: 1px;
  justify-content: center;
  align-items: center;
`;

const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;
function MovieDetail(props) {
  const [info, setInfo] = React.useState(null);
  React.useEffect(() => {
    let url =
      'https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=ed1de2a3f8cbe24e6b4b7028862c56aa';
    url += '&movieCd=' + props.route.params.movieCd;

    fetch(url)
      .then((data) => {
        setInfo(data.movieInfoResult.movieInfo);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);
  return (
    <Container>
      <Header>
        <Back onPress={() => props.navigation.goBack()}>
          <BackLabel>⬅️</BackLabel>
        </Back>
        <HeaderTitle>영화 정보 조회</HeaderTitle>
      </Header>
      <Contents>
        {info === null ? (
          <ActivityIndicator size={'large'}></ActivityIndicator>
        ) : (
          <>
            <Title>{info.movieNm}</Title>
            <Description>제작년도 : {info.prdtYear}년</Description>
            <Description>
              개봉일 : {moment(info.openDt, 'YYYYMMDD').format('YYYY-MM-DD')}
            </Description>
            <Description>상영시간 : {info.showTm} 분</Description>
            <Description>
              감독 :{info.directors.map((item) => item.peopleNm).join(', ')}
            </Description>
            <Description>
              국가 : {info.nations.map((item) => item.nationNm).join(', ')}
            </Description>
            <Description>
              배우 : {info.actors.map((item) => item.peopleNm).join(', ')}
            </Description>
          </>
        )}
      </Contents>
    </Container>
  );
}

export default MovieDetail;
