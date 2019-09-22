import React, { memo } from 'react';
import { Tag } from 'antd';
import { getDetailCdNmByDetailCd } from '../../libs/codeUtils';
import { ATTR_COLOR, COLOR } from '../../constants/styles';
import './AttrTag.less';

const AttrTag = ({ attrCd, codes, isMock, ...restProps }) => {
  return (
    <Tag
      className='attr-tag'
      color={isMock ? COLOR.LIGHT_GRAY : ATTR_COLOR[attrCd]}
      {...restProps}
    >
      {isMock ? <span>&#10240;</span> : getDetailCdNmByDetailCd(attrCd, codes)}
    </Tag>
  );
};

export default memo(AttrTag);
