import React, { memo, useCallback } from 'react';
import { Tag, Tooltip } from 'antd';
import { getGradeCdFromTitle } from '../../libs/hpUtils';
import '../GradeTag/GradeTag.less';
import { GRADE_STYLE, ATTR_COLOR } from '../../constants/styles';

const TitleTag = ({ title, attrCd, buff, style }) => {
  const renderbuff = useCallback(buffArr => {
    return buffArr.map((item, idx) => {
      const labels = ['체력', '공격', '방어', '특공', '특방', '민첩'];
      if (item > 0)
        return (
          <p style={{ marginBottom: 0 }}>
            {labels[idx]}: <span className='c-primary fw-700'>+{item}</span>
          </p>
        );
      else return null;
    });
  }, []);

  if (!attrCd) {
    return (
      <Tag
        className='grade-tag'
        style={Object.assign(
          {},
          GRADE_STYLE[getGradeCdFromTitle(title)],
          style
        )}
      >
        <Tooltip title={renderbuff(buff)}>{title}</Tooltip>
      </Tag>
    );
  } else {
    return (
      <Tag className='attr-tag' color={ATTR_COLOR[attrCd]} style={style}>
        <Tooltip title={renderbuff(buff)}>{title}</Tooltip>
      </Tag>
    );
  }
};

export default memo(TitleTag);
