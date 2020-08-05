import React from 'react';
import {Switch, Text} from 'react-native';
import {withContext} from 'context-q';

function Component(props) {
  const [checked, setChecked] = React.useState(props.context.showData);

  return (
    <>
      <Text>날짜 표시</Text>
      <Switch
        value={checked}
        onValueChange={() => {
          setChecked(!checked);
          //context update
          props.context.update({
            showDate: !checked,
          });
        }}></Switch>
    </>
  );
}

Component = withContext(Component);

export default Component;
