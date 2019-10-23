import React, { useState, useCallback } from 'react';
import { Row, Card, Affix, Button, Col, Empty } from 'antd';
import { Waypoint } from 'react-waypoint';
import MonCard from '../MonCard';
import BottomTotal from '../BottomTotal';
import { ISelectConfigs } from '../../routes/Collection/CollectionView';
import { isCollection } from '../../libs/hpUtils';
import { ICollection } from '../../stores/models/collectionModel';
import { IMon } from '../../stores/models/monModel';
import { ICode } from '../../stores/models/codeModel';
import { IUser } from '../../stores/models/userModel';
import { observer } from 'mobx-react';
import SpinContainer from '../SpinContainer';

interface ICollectionListProps {
  list: (ICollection | IMon)[];
  codes: ICode[];
  mixable?: boolean;
  selectable?: boolean;
  selectConfigs?: ISelectConfigs;
  evolutable?: boolean;
  user: IUser;
  selectedMons?: ICollection[];
  onClickMix: (col: ICollection) => void;
  proceeding: boolean;
}

const CollectionList = ({
  list,
  codes,
  mixable,
  selectable,
  selectConfigs, // { message, onSelect, onCancel }
  evolutable,
  user,
  selectedMons,
  proceeding,
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
      {proceeding && <SpinContainer />}
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
            key={!isCollection(col) ? col.id : col.monId} // 콜렉션과 몬스터가 섞여있으므로 유니크하기 위해
            withWrapper
            mon={col}
            codes={codes}
            mixable={mixable}
            evolutable={evolutable}
            onClick={selectable ? () => handleOnClickMonCard(col) : undefined}
            hideInfo={!isCollection(col)}
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

export default observer(CollectionList);
