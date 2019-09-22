import React, { memo } from 'react';
import { Tag } from 'antd';
import { getDetailCdNmByDetailCd } from '../../libs/codeUtils';
import { RANK_COLOR } from '../../constants/styles';
import './RankTag.less';

const RankTag = ({ rankCd, codes }) => {
  return (
    <Tag className='rank-tag' color={RANK_COLOR[rankCd]}>
      {getDetailCdNmByDetailCd(rankCd, codes)}
    </Tag>
  );
};

export default memo(RankTag);
