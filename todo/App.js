import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, Platform } from "react-native";
import styled from "styled-components/native";
import Constants from "expo-constants";
import _ from "lodash";
import AsyncStorage from "@react-native-community/async-storage";
import produce from "immer";

/*
produce 사용
const obj = { a: 1, b: 2 };
const newObj = produce(obj, (draft) => {
  draft.b = "b";
  draft.c = [];
});
const complexData = {
  title : '',
  children : [
    {
      subTitle : ''
    }
  ]
}
produce(complexData, draft => {
  draft.children[0].subTitle = "new Title"
});*/

/*
  const array = [] 가 있을 때
  array.map
  array.filter
  위 함수는 자바스크립트 이뮤터블함. (원래의 배열 값을 변경하지 않는다.)
  사용할때는 기존 변수에 지정해주거나 새로운 변수에 지정을 하는식으로 사용할수있다.

  array.push
  array.pop
  array.shift, unshift
  위 함수는 이뮤터블하지 않아서 원래의 배열 값을 변경한다.

  배열 관련된 함수 사용시 주의사항

*/

/*
AsyncStorage.getItem("list")
  .then((data) => {
    alert(data);
  });
  .catch(error=>{
    alert(error.message);
  });
  */

/*
  AsyncStorage.setItem("list")
  .then(data)=>{
    alert(data)
  })
  .catch(error=>{
    alert(error.message);
  });
  */
const Container = styled.SafeAreaView`
  flex: 1;
  padding-top: ${Constants.statusBarHeight}px;
`;
const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
`;
const Contents = styled.ScrollView`
  flex: 1;
  padding: 8px 24px;
`;
const TodoItem = styled.View`
  flex-direction: row;
  align-items: center;
`;
const TodoItemText = styled.Text`
  font-size: 20px;
  flex: 1;
`;
const TodoItemButton = styled.Button``;
const InputContainer = styled.View`
  flex-direction: row;
  padding: 8px 24px;
`;

const Input = styled.TextInput`
  border: 1px solid #e5e5e5;
  flex: 1;
`;

const Button = styled.Button``;

const TempText = styled.Text`
  font-size: 36px;
  margin-bottom: 12px;
`;

const Check = styled.TouchableOpacity`
  margin-right: 4px;
`;
const CheckIcon = styled.Text`
  font-size: 20px;
`;
export default function App() {
  const [list, setList] = React.useState([]);
  //컴포넌트, 컴포넌트로 이루어진 배열을 리턴할 수 있다.

  const [inputTodo, setInputTodo] = React.useState("");
  //map -> 자바스크립트 함수로 결과를 배열로 리턴한다.

  React.useEffect(() => {
    /*
    async await 를 사용한다면?
    const init = async () => {};
    init();
    (async () => {})();
    */
    AsyncStorage.getItem("list")
      .then((data) => {
        if (data !== null) {
          setList(JSON.parse(data));
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  const store = (newList) => {
    setList(newList);

    AsyncStorage.setItem("list", JSON.stringify(newList));
  };
  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Contents>
          {list.map((item) => {
            return (
              <TodoItem key={item.id}>
                <Check
                  onPress={() => {
                    store(
                      produce(list, (draft) => {
                        const index = list.indexOf(item);
                        draft[index].done = !list[index].done;
                      })
                    );
                  }}
                >
                  <CheckIcon>{item.done ? "✅" : "☑️"}</CheckIcon>
                </Check>
                <TodoItemText>{item.todo}</TodoItemText>
                <TodoItemButton
                  title="삭제"
                  onPress={() => {
                    const rejectedList = _.reject(
                      list,
                      (element) => element.id === item.id
                    );
                    store(rejectedList);
                  }}
                ></TodoItemButton>
              </TodoItem>
            );
          })}
        </Contents>

        <InputContainer>
          <Input
            value={inputTodo}
            onChangeText={(value) => setInputTodo(value)}
          />
          <Button
            title="전송"
            onPress={() => {
              if (inputTodo == "") {
                return;
              }
              //원본 배열을 수정하는 push는 사용불가
              // inputTodo.push({...})
              const newItem = {
                id: new Date().getTime().toString(),
                todo: inputTodo,
                done: false,
              };
              // ... 은 전개연산자 Spread Operator
              store([...list, newItem]);
              setInputTodo("");
            }}
          />
        </InputContainer>
      </KeyboardAvoidingView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
