import React, { useState, useMemo, useCallback, useContext } from 'react';
import { Modal, Button, Row, Col } from 'antd';
import {
  getMonImageUrl,
  isUserBookMon,
  isCollection,
} from '../../libs/hpUtils';
import MonInfo from '../MonInfo/index';
import MonStat from '../MonStat/index';
import LevelTag from '../LevelTag/index';
import LevelUpTag from '../LevelUpTag';
import './MonModal.less';
import imgEmpty from '../../imgs/empty-mon.png';
import MessageModal from '../MessageModal/index';
import ConfirmModal from '../ConfirmModal/index';
import { IMon } from '../../stores/models/monModel';
import { ICollection } from '../../stores/models/collectionModel';
import AppContext from '../../contexts/AppContext';
import { MessageModalType } from '../MessageModal/MessageModal';
import { observer } from 'mobx-react';
import history from '../../libs/history';
import { IUser } from '../../stores/models/userModel';

interface IMonModalProps {
  visible: boolean;
  onCancel: () => void;
  mon: ICollection | IMon;
  prevMon?: ICollection;
  mixable?: boolean;
  evolutable?: boolean;
  hideInfo?: boolean;
  user: IUser;
}

const MonModal = ({
  visible,
  onCancel,
  mon,
  prevMon,
  mixable,
  evolutable,
  hideInfo,
  user,
}: IMonModalProps) => {
  const [flipped, setFlipped] = useState(false);
  const { codeStore, collectionStore } = useContext(AppContext);
  const { codes } = codeStore;
  const { selectCollectionToMix, evoluteCollection } = collectionStore;

  const isEvolutableLevel = useMemo(() => {
    if (isCollection(mon)) {
      return (
        ((mon.nextMons[0] && mon.nextMons[0].requiredLv) || Number.MAX_VALUE) <=
        mon.level
      );
    } else {
      return false;
    }
  }, [mon]);

  const handleOnClickMix = useCallback(() => {
    if (user.books && isCollection(mon) && isUserBookMon(user.books, mon)) {
      if (mon.level === 1) {
        MessageModal({
          type: MessageModalType.error,
          title: '교배 불가',
          content:
            '도감에 등록되어있는 포켓몬입니다. 도감에서 제외하거나 다음 레벨에서 교배해주세요!',
        });
      } else {
        ConfirmModal({
          title: '도감에 등록된 포켓몬',
          content:
            '도감에 등록되어있는 포켓몬입니다. 교배하게 되면 도감보너스가 하락합니다. 그래도 교배하시겠습니까?',
          onOk: () => {
            selectCollectionToMix(mon);
            onCancel();
          },
        });
      }
    } else if (isCollection(mon)) {
      selectCollectionToMix(mon);
      onCancel();
    }
  }, [mon, user.books, onCancel, selectCollectionToMix]);

  const handleOnClickEvolute = useCallback(() => {
    if (isCollection(mon) && user.books && isUserBookMon(user.books, mon)) {
      if (mon.nextMons[0].requiredLv === mon.level) {
        MessageModal({
          type: MessageModalType.error,
          title: '진화 불가',
          content:
            '도감에 등록되어있는 포켓몬입니다. 도감에서 제외하거나 다음 레벨에서 진화해주세요!',
        });
      } else {
        ConfirmModal({
          title: '도감에 등록된 포켓몬',
          content:
            '도감에 등록되어있는 포켓몬입니다. 진화하게 되면 도감보너스가 하락합니다. 그래도 진화하시겠습니까?',
          onOk: () => {
            evoluteCollection(mon.id);
            history.replace('/pick');
          },
        });
      }
    } else if (isCollection(mon)) {
      evoluteCollection(mon.id);
      history.replace('/pick');
    }
  }, [mon, evoluteCollection, user.books]);

  return (
    <Modal
      // id={`mon-modal-${isCollection(mon) ? mon.monId : mon.id}`}
      className='mon-modal'
      visible={visible}
      title='포켓몬 정보'
      footer={[
        <Button size='large' type='link' key='close' onClick={onCancel}>
          닫기
        </Button>,
        <Button
          size='large'
          key='flip'
          type='primary'
          onClick={() => setFlipped(!flipped)}
          icon='sync'
        >
          뒤집기
        </Button>,
      ]}
      onCancel={onCancel}
      centered
    >
      <Row gutter={24}>
        <Col
          sm={8}
          span={24}
          className='text-center'
          style={{ marginBottom: 24 }}
        >
          <img
            src={hideInfo ? imgEmpty : getMonImageUrl(mon)}
            alt='손켓몬 이미지'
            style={{ width: '100%', maxWidth: 200 }}
          />
          <div style={{ marginTop: 12 }}>
            {isCollection(mon) && prevMon && (
              <LevelUpTag level={mon.level} prevLevel={prevMon.level} />
            )}
            {isCollection(mon) && !prevMon && mon.level && (
              <LevelTag level={mon.level} evolutable={isEvolutableLevel} />
            )}
          </div>
          <div style={{ marginTop: 12 }}>
            {isCollection(mon) && mon.level && mixable && (
              <Button
                size='small'
                onClick={handleOnClickMix}
                style={{ margin: 2 }}
              >
                교배하기
              </Button>
            )}
            {isCollection(mon) && mon.level && evolutable && isEvolutableLevel && (
              <Button
                size='small'
                onClick={handleOnClickEvolute}
                style={{ margin: 2 }}
              >
                진화하기
              </Button>
            )}
          </div>
        </Col>
        <Col sm={16} span={24}>
          {!flipped && (
            <MonInfo
              mon={prevMon || mon}
              nextMon={isCollection(mon) && prevMon ? mon : undefined}
              hideInfo={hideInfo || false}
              user={user}
            />
          )}
          {flipped && (
            <MonStat
              mon={prevMon || mon}
              nextMon={prevMon ? mon : undefined}
              user={user}
            />
          )}
        </Col>
      </Row>
    </Modal>
  );
};

export default observer(MonModal);
