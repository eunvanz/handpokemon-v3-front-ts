import React, { memo } from 'react';
import { getTotalFromColAndUser } from '../../libs/hpUtils';

const BottomTotal = ({ col, user }) => {
  return (
    <div className='text-center' style={{ marginBottom: 9, marginTop: 6 }}>
      총 전투력:{' '}
      <span className='c-primary fw-700'>
        {getTotalFromColAndUser(col, user)}
      </span>
    </div>
  );
};

export default memo(BottomTotal);
