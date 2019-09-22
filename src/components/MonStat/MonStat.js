import React, { memo, useMemo, useCallback } from 'react';
import { Row, Col } from 'antd';
import { COLOR } from '../../constants/styles';
import './MonStat.less';
import 'antd/lib/progress/style/index.less';
import {
  getBonusPctByAttrCdFromBook,
  getbuffFromUserAchievements
} from '../../libs/hpUtils';

const StatItem = memo(
  ({ label, base, added = 0, newAdded = 0, buff = 0, titlebuff = 0 }) => {
    const getStatPercent = useCallback(value => {
      return (value * 100) / 400;
    }, []);
    return (
      <div className='stat-item'>
        <p className='stat-label'>
          {label}: <span style={{ color: COLOR.GRAY }}>{base}</span>
          {added > 0 && <span style={{ color: COLOR.ORANGE }}>+{added}</span>}
          {buff > 0 && <span style={{ color: COLOR.GREEN }}>+{buff}</span>}
          {titlebuff > 0 && (
            <span style={{ color: COLOR.DEEP_ORANGE }}>+{titlebuff}</span>
          )}
          {newAdded > 0 && (
            <span style={{ color: COLOR.LIGHT_BLUE }}>+{newAdded}</span>
          )}
        </p>
        <div className='ant-progress ant-progress-line ant-progress-status-normal ant-progress-show-info ant-progress-default'>
          <div className='ant-progress-outer'>
            <div className='ant-progress-inner'>
              <div
                className='ant-progress-bg'
                style={{ width: `${getStatPercent(base)}%` }}
              />
              {added > 0 && (
                <div
                  className='ant-progress-success-bg added'
                  style={{
                    width: `${getStatPercent(added)}%`,
                    left: `${getStatPercent(base)}%`
                  }}
                />
              )}
              {buff > 0 && (
                <div
                  className='ant-progress-success-bg buff'
                  style={{
                    width: `${getStatPercent(buff)}%`,
                    left: `${getStatPercent(base) + getStatPercent(added)}%`
                  }}
                />
              )}
              {titlebuff > 0 && (
                <div
                  className='ant-progress-success-bg title-buff'
                  style={{
                    width: `${getStatPercent(titlebuff)}%`,
                    left: `${getStatPercent(base) +
                      getStatPercent(added) +
                      getStatPercent(buff)}%`
                  }}
                />
              )}
              {newAdded > 0 && (
                <div
                  className='ant-progress-success-bg new-added'
                  style={{
                    width: `${getStatPercent(newAdded)}%`,
                    left: `${getStatPercent(base) +
                      getStatPercent(added) +
                      getStatPercent(titlebuff) +
                      getStatPercent(buff)}%`
                  }}
                />
              )}
            </div>
          </div>
          <span className='ant-progress-text'>
            {base + added + newAdded + buff + titlebuff}
          </span>
        </div>
      </div>
    );
  }
);

const MonStat = ({ mon, nextMon, user, ...restProps }) => {
  const thisMon = useMemo(() => mon.mon || mon, [mon]);
  const col = useMemo(() => (mon.mon ? mon : null), [mon]);
  const getbuff = useCallback(
    raw => {
      return Math.round(
        (raw *
          (user
            ? getBonusPctByAttrCdFromBook(col.mainAttrCd, user.books)
            : 1)) /
          100
      );
    },
    [col, user]
  );
  const getTitlebuff = useCallback(() => {
    return getbuffFromUserAchievements(user.achievements);
  }, [user]);

  return (
    <Row {...restProps}>
      <Col span={24}>
        <StatItem
          label='체력'
          base={col ? col.baseHp : thisMon.hp}
          added={col ? col.addedHp : 0}
          newAdded={nextMon ? nextMon.addedHp - col.addedHp : 0}
          buff={col ? getbuff(col.baseHp + col.addedHp) : 0}
          titlebuff={col && user ? getTitlebuff()[0] : 0}
        />
        <StatItem
          label='공격'
          base={col ? col.basePower : thisMon.power}
          added={col ? col.addedPower : 0}
          newAdded={nextMon ? nextMon.addedPower - col.addedPower : 0}
          buff={col ? getbuff(col.basePower + col.addedPower) : 0}
          titlebuff={col && user ? getTitlebuff()[1] : 0}
        />
        <StatItem
          label='방어'
          base={col ? col.baseArmor : thisMon.armor}
          added={col ? col.addedArmor : 0}
          newAdded={nextMon ? nextMon.addedArmor - col.addedArmor : 0}
          buff={col ? getbuff(col.baseArmor + col.addedArmor) : 0}
          titlebuff={col && user ? getTitlebuff()[2] : 0}
        />
        <StatItem
          label='특수공격'
          base={col ? col.baseSPower : thisMon.sPower}
          added={col ? col.addedSPower : 0}
          newAdded={nextMon ? nextMon.addedSPower - col.addedSPower : 0}
          buff={col ? getbuff(col.baseSPower + col.addedSPower) : 0}
          titlebuff={col && user ? getTitlebuff()[3] : 0}
        />
        <StatItem
          label='특수방어'
          base={col ? col.baseSArmor : thisMon.sArmor}
          added={col ? col.addedSArmor : 0}
          newAdded={nextMon ? nextMon.addedSArmor - col.addedSArmor : 0}
          buff={col ? getbuff(col.baseSArmor + col.addedSArmor) : 0}
          titlebuff={col && user ? getTitlebuff()[4] : 0}
        />
        <StatItem
          label='민첩'
          base={col ? col.baseDex : thisMon.dex}
          added={col ? col.addedDex : 0}
          newAdded={nextMon ? nextMon.addedDex - col.addedDex : 0}
          buff={col ? getbuff(col.baseDex + col.addedDex) : 0}
          titlebuff={col && user ? getTitlebuff()[5] : 0}
        />
      </Col>
    </Row>
  );
};

export default memo(MonStat);
