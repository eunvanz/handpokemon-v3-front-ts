import React from 'react';
import { Tag } from 'antd';
import { ATTR_COLOR, COLOR } from '../../constants/styles';
import './AttrTag.less';
import { TagProps } from 'antd/lib/tag';
import { getDetailCdNmByDetailCd } from '../../libs/codeUtils';

interface IAttrTag extends TagProps {
  attrCd?: string;
  codes?: any[];
  isMock?: boolean;
}

const AttrTag = ({ attrCd, codes, isMock, ...restProps }: IAttrTag) => {
  return (
    <Tag
      className='attr-tag'
      color={isMock ? COLOR.LIGHT_GRAY : attrCd && ATTR_COLOR[attrCd]}
      {...restProps}
    >
      {isMock ? <span>&#10240;</span> : getDetailCdNmByDetailCd(attrCd, codes)}
    </Tag>
  );
};

export default AttrTag;
