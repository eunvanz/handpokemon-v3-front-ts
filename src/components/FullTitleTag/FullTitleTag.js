import React, { memo } from 'react';
import orderBy from 'lodash/orderBy';
import TitleTag from '../TitleTag';

const FullTitleTag = ({ achievements }) => {
  const activatedTitles = orderBy(
    achievements,
    item => item.achievement.achievementTypeCd,
    ['asc']
  ).filter(item => item.activated);

  if (activatedTitles.length > 0) {
    return activatedTitles.map(item => (
      <TitleTag
        title={item.achievement.name}
        attrCd={item.achievement.attrCd}
        buff={item.achievement.buff.split(',')}
        style={{ marginRight: 3 }}
      />
    ));
  } else {
    return <span>활성화된 칭호가 없습니다.</span>;
  }
};

export default memo(FullTitleTag);
