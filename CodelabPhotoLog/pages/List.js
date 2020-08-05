import React from 'react';
import styled from 'styled-components/native';
import storage from '../net/storage';
import {withContext} from 'context-q';
import moment from 'moment';

const Title = styled.Text`
  font-size: 36px;
`;
const Button = styled.Button``;
const ListItem = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #e5e5e5;
`;
const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Thumbnail = styled.Image`
  width: 80px;
  height: 80px;
  margin-right: 12px;
`;
const Tags = styled.Text``;
const Date = styled.Text`
  color: #aaaaaa;
  margin-right: 12px;
`;
function Component(props) {
  const [list, setList] = React.useState([]);
  React.useEffect(() => {
    storage.readAll().then((data) => {
      if (data) {
        setList(data);
      }
    });
  }, []);
  return (
    <>
      <Title>목록</Title>
      {list
        ? list.map((item) => (
            <ListItem
              key={item.id}
              onPress={() => {
                props.navigation.navigate('View', {id: item.id});
              }}>
              <Row>
                <Thumbnail source={{uri: item.url}}></Thumbnail>
                <Tags>{item.hashtags}</Tags>
              </Row>
              {props.context.showDate ? (
                <Date>
                  {moment(item.id, 'x').format('YYYY-MM-DD HH:mm:ss')}
                </Date>
              ) : null}
            </ListItem>
          ))
        : null}
      <Button
        title="사진 추가"
        onPress={() => {
          props.navigation.navigate('Form');
        }}></Button>
      <Button
        title="모두 삭제"
        onPress={() => {
          storage.removeValue();
        }}></Button>
      <Button
        title="설정"
        onPress={() => {
          props.navigation.navigate('Settings');
        }}></Button>
    </>
  );
}

Component = withContext(Component);

export default Component;
