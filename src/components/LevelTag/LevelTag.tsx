import React from 'react';
import { Tag } from 'antd';
import './LevelTag.less';
import { COLOR } from '../../constants/styles';
import { TagProps } from 'antd/lib/tag';

interface ILevelTag extends TagProps {
  level: number;
  evolutable?: boolean;
  old?: number;
}

const LevelTag = ({ level, evolutable, old, ...restProps }: ILevelTag) => {
  return (
    <Tag
      className='level-tag'
      color={
        old ? COLOR.GRAY : evolutable ? COLOR.DEEP_ORANGE : COLOR.LIGHT_BLUE
      }
      {...restProps}
    >
      LV. {level}
    </Tag>
  );
};

export default LevelTag;
