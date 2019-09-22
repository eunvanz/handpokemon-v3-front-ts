import React, { memo, useMemo } from 'react';
import { Row, Col } from 'antd';
import GradeTag from '../GradeTag';
import AttrTag from '../AttrTag/index';
import Cost from '../Cost/index';
import './MonInfo.less';
import RankTag from '../RankTag';
import { COLOR } from '../../constants/styles';
import {
  getTotalFromColAndUser,
  getBonusPctByAttrCdFromBook,
  getTotalbuffFromColAndUser,
  getbuffFromUserAchievements,
} from '../../libs/hpUtils';

const MonInfo = ({ mon, codes, nextMon, hideInfo, user, ...restProps }) => {
  const thisMon = useMemo(() => mon.mon || mon, [mon]);
  const col = useMemo(() => (mon.mon ? mon : null), [mon]);
  const total = useMemo(() => {
    if (nextMon) return getTotalFromColAndUser(nextMon, user);
    else return col ? getTotalFromColAndUser(col, user) : thisMon.total;
  }, [user, nextMon, col, thisMon.total]);
  const bonusPct = useMemo(() => {
    if (!col || !user) return 0;
    return getBonusPctByAttrCdFromBook(col.mainAttrCd, user.books);
  }, [user, col]);
  const titlebuffTotal = useMemo(() => {
    if (!col || !user) return 0;
    return getbuffFromUserAchievements(user.achievements).reduce(
      (accm, value) => accm + value,
      0
    );
  }, [user, col]);

  return (
    <Row className='mon-info' {...restProps}>
      <Col span={6}>이름</Col>
      <Col span={18}>
        <span className='c-primary fw-700'>
          {hideInfo ? '????' : thisMon.name}
        </span>
      </Col>
      {col && (
        <>
          <Col span={6}>랭크</Col>
          <Col span={18}>
            <RankTag rankCd={col.rankCd} codes={codes} />
          </Col>
        </>
      )}
      <Col span={6}>등급</Col>
      <Col span={18}>
        <GradeTag gradeCd={thisMon.gradeCd} /> (
        <span className='c-primary fw-700'>+{thisMon.point}</span> 콜렉션점수)
      </Col>
      <Col span={6}>속성</Col>
      <Col span={18}>
        <AttrTag attrCd={(col || mon).mainAttrCd} codes={codes} />
        {(col || mon).subAttrCd && (
          <AttrTag
            attrCd={(col || mon).subAttrCd}
            codes={codes}
            style={{ marginLeft: 2 }}
          />
        )}
      </Col>
      <Col span={6}>코스트</Col>
      <Col span={18}>
        <Cost cost={thisMon.cost} />
      </Col>
      <Col span={6}>전투력</Col>
      <Col span={18}>
        {!col && '평균 '}
        <span className='c-primary fw-700'>
          {total}{' '}
          {col && user && (
            <span style={{ color: COLOR.GRAY }}>
              (<span>{col.baseTotal}</span>
              {col.addedTotal > 0 && (
                <span style={{ color: COLOR.ORANGE }}>+{col.addedTotal}</span>
              )}
              {bonusPct !== 0 && (
                <span style={{ color: COLOR.GREEN }}>
                  +{getTotalbuffFromColAndUser(col, user)}
                </span>
              )}
              {titlebuffTotal > 0 && (
                <span style={{ color: COLOR.DEEP_ORANGE }}>
                  +{titlebuffTotal}
                </span>
              )}
              {nextMon && (
                <span style={{ color: COLOR.LIGHT_BLUE }}>
                  +{nextMon.addedTotal - col.addedTotal}
                </span>
              )}
              )
            </span>
          )}
        </span>
      </Col>
      <Col span={6}>피지컬</Col>
      <Col span={18}>
        {col ? '' : '평균 '}
        <span className='c-primary fw-700'>{(col || thisMon).height}</span>m /
        {col ? ' ' : ' 평균 '}
        <span className='c-primary fw-700'>{(col || thisMon).weight}</span>kg
      </Col>
      <Col span={6}>진화</Col>
      <Col span={18}>
        {mon.nextMons && mon.nextMons.length > 0 ? (
          <div>
            <span className='c-primary fw-700'>
              LV. {mon.nextMons[0].requiredLv}
            </span>
            부터 가능
          </div>
        ) : (
          '-'
        )}
      </Col>
      <Col span={24}>
        {thisMon.description}
        {!hideInfo && mon.monImages && mon.monImages.length > 0 && (
          <span>
            (designed by{' '}
            <span className='c-primary fw-700'>
              {
                mon.monImages.filter(
                  item => item.seq === (col ? col.imageSeq : 0)
                )[0].designer
              }
            </span>
            )
          </span>
        )}
      </Col>
    </Row>
  );
};

export default memo(MonInfo);
