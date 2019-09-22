import React, { memo } from 'react';
import { Button } from 'antd';
import './AddMonCard.less';

const AddMonCard = ({
  onClickAddMon,
  onClickChange,
  onClickDelete,
  col,
  onShowMonModal
}) => {
  return (
    <div className='center-middle-aligner add-mon-card'>
      {col && (
        <div>
          <div style={{ marginBottom: 6 }}>
            <Button type='primary' icon='search' onClick={onShowMonModal}>
              상세
            </Button>
          </div>
          <div style={{ marginBottom: 6 }}>
            <Button type='primary' icon='sync' onClick={onClickChange}>
              교체
            </Button>
          </div>
          <div>
            <Button type='danger' icon='minus' onClick={onClickDelete}>
              삭제
            </Button>
          </div>
        </div>
      )}
      {!col && (
        <Button type='primary' icon='plus' onClick={onClickAddMon}>
          추가
        </Button>
      )}
    </div>
  );
};

export default memo(AddMonCard);
