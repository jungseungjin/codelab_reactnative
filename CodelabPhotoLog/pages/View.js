import React from 'react';
import styled from 'styled-components/native';
import storage from '../net/storage';
import {withContext} from 'context-q';
import moment from 'moment';

const Title = styled.Text`
  font-size: 36px;
`;
const Image = styled.Image`
  width: 100%;
  height: 360px;
`;
const Tags = styled.Text`
  font-size: 18px;
`;
const Date = styled.Text`
  color: #aaaaaa;
  font-size: 14px;
  text-align: right;
`;
function Component(props) {
  const [item, setItem] = React.useState(null);
  React.useEffect(() => {
    storage
      .readById(props.route.params.id)
      .then((data) => setItem(data))
      .catch((error) => alert(error));
  });
  return (
    <>
      {item ? (
        <>
          <Image source={{uri: item.url}}></Image>
          {props.context.showDate ? (
            <Date>{moment(item.id, 'x').format('YYYY-MM-DD HH:mm:ss')}</Date>
          ) : (
            ''
          )}
          <Tags>{item.hashtags}</Tags>
        </>
      ) : null}
    </>
  );
}

Component = withContext(Component);

export default Component;
