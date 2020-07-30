/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import styled from 'styled-components/native';
import movieList from './movieList';
import _ from 'lodash';

const Container = styled.SafeAreaView`
  flex: 1;
`;

const Contents = styled.View`
  flex: 1;
  padding: 24px;
`;

const Quiz = styled.Text`
  font-size: 32px;
  font-weight: bold;
  text-align: center;
`;

const Button = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  background: #e4e4e4;
  justify-content: center;
  align-items: center;
`;

const Label = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #000;
`;

function getInitials(string) {
  return string
    .split('')
    .map((char) => {
      const index = (char.charCodeAt(0) - 44032) / 28 / 21;
      if (index >= 0) return String.fromCharCode(index + 4352);
      return char;
    })
    .join('');
}

const App: () => React$Node = () => {
  const [quizList, setQuizList] = React.useState(_.shuffle(movieList));
  const [mode, setMode] = React.useState('quiz'); //quiz or answer
  const onPress = React.useCallback(() => {
    if (mode === 'answer') {
      setQuizList(quizList.slice(1));
    }
    setMode(mode === 'quiz' ? 'answer' : 'quiz');
  }, [mode]); //모드가 변경될때 콜백이 실행됨
  // const onPress = () => {

  //}  랑 같음  다만 실행될때마다 계속 생성. 성능 최적화상에 문제 우려가 있음(안에 내용이 변경되지 않아도 새로실행되기때문) useCallback 추천

  const retry = React.useCallback(() => {
    setQuizList(_.shuffle(movieList));
  }, [quizList]);
  return (
    <>
      <Container>
        <Contents>
          {quizList.length ? (
            <Quiz>
              {mode === 'quiz' ? getInitials(quizList[0]) : quizList[0]}
            </Quiz>
          ) : (
            <Quiz>퀴즈 끝</Quiz>
          )}
        </Contents>
        {quizList.length ? (
          <Button onPress={onPress}>
            <Label>{mode === 'quiz' ? '정답 확인' : '다음'}</Label>
          </Button>
        ) : (
          <Button onPress={retry}>
            <Label>다시 시작</Label>
          </Button>
        )}
      </Container>
    </>
  );
};

export default App;
