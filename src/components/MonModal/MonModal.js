import React, { memo, useState, useMemo, useCallback } from 'react';
import { Modal, Button, Row, Col } from 'antd';
import { getMonImageUrl, isUserBookMon } from '../../libs/hpUtils';
import MonInfo from '../MonInfo/index';
import MonStat from '../MonStat/index';
import LevelTag from '../LevelTag/index';
import LevelUpTag from '../LevelUpTag';
import './MonModal.less';
import imgEmpty from '../../imgs/empty-mon.png';
import MessageModal from '../MessageModal/index';
import ConfirmModal from '../ConfirmModal/index';

const MonModal = ({
  visible,
  onCancel,
  mon,
  codes,
  prevMon,
  onClickMix,
  onClickEvolute,
  mixable,
  evolutable,
  hideInfo,
  user,
}) => {
  const [flipped, setFlipped] = useState(false);
  const isEvolutableLevel = useMemo(() => {
    if (!mon.nextMons || mon.nextMons.length === 0 || !mon.mon) return false;
    else return mon.nextMons[0].requiredLv <= mon.level;
  }, [mon]);

  const handleOnClickMix = useCallback(() => {
    if (isUserBookMon(user.books, mon)) {
      if (mon.level === 1) {
        MessageModal({
          type: 'error',
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
            onClickMix(mon);
          },
        });
      }
    } else {
      onClickMix(mon);
    }
  }, [mon, user, onClickMix]);

  const handleOnClickEvolute = useCallback(() => {
    if (isUserBookMon(user.books, mon)) {
      if (mon.nextMons[0].requiredLv === mon.level) {
        MessageModal({
          type: 'error',
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
            onClickEvolute(mon);
          },
        });
      }
    } else {
      onClickEvolute(mon);
    }
  }, [mon, user, onClickEvolute]);

  return (
    <Modal
      id={`mon-modal-${mon.monId}`}
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
            {prevMon && (
              <LevelUpTag level={mon.level} prevLevel={prevMon.level} />
            )}
            {!prevMon && mon.level && (
              <LevelTag level={mon.level} evolutable={isEvolutableLevel} />
            )}
          </div>
          <div style={{ marginTop: 12 }}>
            {mon.level && mixable && (
              <Button
                size='small'
                onClick={handleOnClickMix}
                style={{ margin: 2 }}
              >
                교배하기
              </Button>
            )}
            {mon.level && evolutable && isEvolutableLevel && (
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
              codes={codes}
              nextMon={prevMon ? mon : null}
              hideInfo={hideInfo}
              user={user}
            />
          )}
          {flipped && (
            <MonStat
              mon={prevMon || mon}
              nextMon={prevMon ? mon : null}
              user={user}
            />
          )}
        </Col>
      </Row>
    </Modal>
  );
};

export default memo(MonModal);
