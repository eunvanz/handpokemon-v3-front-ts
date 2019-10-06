import React, { useState, useCallback } from 'react';
import { Row, Card, Affix, Button, Col, Empty } from 'antd';
import { Waypoint } from 'react-waypoint';
import MonCard from '../MonCard';
import { isEmpty } from '../../libs/commonUtils';
import BottomTotal from '../BottomTotal';
import { ICollectionInstance } from '../../stores/models/collection';
import { ICodeSnapshotOut } from '../../stores/models/code';
import { ISelectConfigs } from '../../routes/Collection/CollectionView';
import { IUserInstance } from '../../stores/models/user';

interface ICollectionListProps {
  list: ICollectionInstance[];
  codes: ICodeSnapshotOut[];
  mixable?: boolean;
  onClickMix?: (targetCol: ICollectionInstance) => void;
  selectable?: boolean;
  selectConfigs?: ISelectConfigs;
  evolutable?: boolean;
  onClickEvolute?: (targetCol: ICollectionInstance) => void;
  user: IUserInstance;
  selectedMons?: ICollectionInstance[];
}

const CollectionList = ({
  list,
  codes,
  mixable,
  onClickMix,
  selectable,
  selectConfigs, // { message, onSelect, onCancel }
  evolutable,
  onClickEvolute,
  user,
  selectedMons,
}: ICollectionListProps) => {
  const [page, setPage] = useState(1);

  const onLoadNextPage = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  // selectable일 때 카드 클릭 시 이벤트 핸들러
  const handleOnClickMonCard = useCallback(
    mon => {
      selectConfigs && selectConfigs.onSelect(mon);
    },
    [selectConfigs]
  );

  return (
    <>
      {selectable && selectConfigs && (
        <Affix offsetTop={60}>
          <Card style={{ marginBottom: 12 }}>
            <div className='pull-left'>{selectConfigs.message}</div>
            <div className='pull-right'>
              <Button
                type='danger'
                onClick={selectConfigs.onCancel}
                icon='close'
                size='small'
              >
                취소
              </Button>
            </div>
          </Card>
        </Affix>
      )}
      <Row gutter={6} type='flex' justify='center'>
        {list.length === 0 && (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description='해당하는 콜렉션이 없습니다.'
          />
        )}
        {(list.length >= 24 ? list.slice(0, page * 24) : list).map(col => (
          <MonCard
            key={col.monId || col.id} // 콜렉션과 몬스터가 섞여있으므로 유니크하기 위해
            withWrapper
            mon={col}
            codes={codes}
            onClickMix={onClickMix}
            onClickEvolute={onClickEvolute}
            mixable={mixable}
            evolutable={evolutable}
            onClick={selectable ? () => handleOnClickMonCard(col) : undefined}
            hideInfo={isEmpty(col.mon)}
            user={user}
            selectable={selectable}
            bottomComponent={
              selectable ? <BottomTotal col={col} user={user} /> : undefined
            }
            selected={
              selectedMons &&
              selectedMons.filter(mon => mon.id === col.id).length > 0
            }
          />
        ))}
        {list.length >= 24 && (
          <Col span={24}>
            <Waypoint onEnter={onLoadNextPage} bottomOffset={-300} />
          </Col>
        )}
      </Row>
    </>
  );
};

export default CollectionList;
