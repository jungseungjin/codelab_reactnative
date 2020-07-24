import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import Container from "./components/Container";
import Row from "./components/Row";
import moment from "moment";
import styled from "styled-components/native";

const Label = styled.Text`
  font-size: 36px;
  font-weight: bold;
`;

export default function App() {
  const [now, setNow] = React.useState(moment());
  //1. 이 컴포넌트가 처음으로 화면에 표시될 때 실행
  //2. 주시하는 대상의 변화가 일어났을 때 실행된다.
  React.useEffect(
    () => {
      //동작
      setInterval(() => {
        setNow(moment());
      }, 1000);
    },
    [
      /*주시 대상 */
    ]
  );
  return (
    <Container>
      <Row>
        <Text>{now.format("YYYY-MM-DD")}</Text>
      </Row>
      <Row>
        <Label>{now.format("HH")}</Label>
        <Label>{parseInt(now.format("s"), 10) % 2 === 1 ? ":" : " "}</Label>
        <Label>{now.format("mm")}</Label>
        <Label>{parseInt(now.format("s"), 10) % 2 === 1 ? ":" : " "}</Label>
        <Label>{now.format("ss")}</Label>
      </Row>
    </Container>
  );
}
