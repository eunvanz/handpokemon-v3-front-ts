import React, { memo } from 'react';
import { Icon } from 'antd';
import { repeat } from '../../libs/commonUtils';
import { COLOR } from '../../constants/styles';

const Cost = ({ cost, isMock }) => {
  let result = [];
  const rest = cost % 5;
  let filledColor;
  let emptyColor;
  if (cost > 5) {
    filledColor = COLOR.GOLD;
    emptyColor = COLOR.DARK_GRAY;
  } else {
    filledColor = COLOR.DARK_GRAY;
    emptyColor = COLOR.LIGHT_GRAY;
  }
  let key = 1;
  repeat(() => {
    const color = rest === 0 || rest - key >= 0 ? filledColor : emptyColor;
    result.push(
      <Icon
        key={key++}
        type='star'
        theme='filled'
        style={{ color: isMock ? COLOR.LIGHT_GRAY : color }}
      />
    );
  }, 5);

  return <div>{result}</div>;
};

export default memo(Cost);
