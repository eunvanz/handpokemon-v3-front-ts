import React, { memo } from 'react';
import { Icon } from 'antd';
import { COLOR } from '../../constants/styles';
import LevelTag from '../LevelTag/index';

const LevelUpTag = ({ level, prevLevel }) => {
  return (
    <div style={{ marginTop: 12, textAlign: 'center' }}>
      <LevelTag
        level={prevLevel}
        style={{
          backgoundColor: COLOR.GRAY,
          fontSize: '0.5rem',
          lineHeight: 1.5
        }}
        old
      />{' '}
      <Icon type='arrow-right' style={{ color: COLOR.GRAY }} />{' '}
      <LevelTag level={level} />
      <p>
        레벨 <span className='c-primary fw-700'>+{level - prevLevel}</span>
      </p>
    </div>
  );
};

export default memo(LevelUpTag);
