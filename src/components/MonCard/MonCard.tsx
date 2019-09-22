import React, {
  memo,
  useCallback,
  useMemo,
  useState,
  ComponentProps,
  ReactElement,
} from 'react';
import { Card, Col, Icon } from 'antd';
import { getMonImageUrl } from '../../libs/hpUtils';
import './MonCard.less';
import GradeTag from '../GradeTag';
import AttrTag from '../AttrTag';
import Cost from '../Cost/index';
import imgEmpty from '../../imgs/empty-mon.png';
import MonModal from '../MonModal';
import RankTag from '../RankTag';
import LevelTag from '../LevelTag';
import { COLOR } from '../../constants/styles';
import { IMon } from '../../stores/models/mon';
import { IUser } from '../../stores/models/user';
import { ICollection } from '../../stores/models/collection';
import { ColProps } from 'antd/lib/col';

interface IMonCardProps extends ComponentProps<'div'> {
  mon?: ICollection | IMon;
  hideInfo?: boolean;
  codes: any[];
  onClick?: () => void;
  withWrapper?: boolean;
  prevMon?: IMon;
  mixable?: boolean;
  onClickMix?: (mon: ICollection) => void;
  evolutable?: boolean;
  onClickEvolute?: (mon: ICollection) => void;
  isMock?: boolean;
  overlay?: ReactElement;
  bottomComponent?: ReactElement;
  user?: IUser;
  toggleFavorite?: (mon: ICollection) => Promise<any>;
  selectable?: boolean;
  selected?: boolean;
}

function isCollection(mon: ICollection | IMon): mon is ICollection {
  return (mon as ICollection).mon !== undefined;
}

const MonCard = ({
  mon,
  hideInfo,
  codes,
  onClick,
  withWrapper,
  prevMon,
  mixable,
  onClickMix,
  evolutable,
  onClickEvolute,
  isMock,
  overlay,
  bottomComponent,
  user,
  toggleFavorite,
  selectable,
  selected,
  ...restProps
}: IMonCardProps) => {
  const [showMonModal, setShowMonModal] = useState(false);
  const [favorite, setFavorite] = useState(
    mon && isCollection(mon) && mon.favorite === 1
  );

  const handleOnClickFavorite = useCallback(
    e => {
      e.stopPropagation();
      if (mon && isCollection(mon) && toggleFavorite) {
        toggleFavorite(mon).then(() => setFavorite(!favorite));
      }
    },
    [toggleFavorite, mon, favorite]
  );

  const handleOnClickInfo = useCallback(e => {
    e.stopPropagation();
    setShowMonModal(true);
  }, []);

  const renderCover = useCallback(() => {
    if (!hideInfo && !isMock) {
      return (
        <div style={{ position: 'relative' }}>
          <img
            src={getMonImageUrl(mon) || imgEmpty}
            alt='손켓몬 이미지'
            style={{ width: '100%' }}
          />
          {mon && (mon as ICollection).mon && (
            <Icon
              onClick={handleOnClickFavorite}
              className='favorite-btn cursor-pointer'
              type='heart'
              theme='filled'
              style={{
                color: favorite ? COLOR.RED : COLOR.GRAY,
              }}
            />
          )}
          {selectable && (
            <Icon
              onClick={handleOnClickInfo}
              className='info-btn cursor-pointer'
              type='info-circle'
              theme='filled'
            />
          )}
        </div>
      );
    } else {
      return (
        <div style={{ position: 'relative' }}>
          <img src={imgEmpty} alt='손켓몬 이미지' style={{ width: '100%' }} />
        </div>
      );
    }
  }, [
    mon,
    hideInfo,
    isMock,
    favorite,
    handleOnClickFavorite,
    selectable,
    handleOnClickInfo,
  ]);

  const renderAttr = useCallback(() => {
    if (mon && !isMock) {
      const thisMon = (isCollection(mon) && mon.mon) || mon;
      const { gradeCd } = thisMon as IMon;
      return (
        <>
          <GradeTag gradeCd={gradeCd} isMock={isMock} />
          <AttrTag attrCd={mon.mainAttrCd} codes={codes} isMock={isMock} />
          {mon.subAttrCd && (
            <AttrTag attrCd={mon.subAttrCd} codes={codes} isMock={isMock} />
          )}
        </>
      );
    } else {
      return (
        <>
          <GradeTag isMock={isMock} />
          <AttrTag isMock={isMock} />
          <AttrTag isMock={isMock} />
        </>
      );
    }
  }, [mon, isMock, codes]);

  const Wrapper = useMemo(() => {
    if (withWrapper) {
      return ({ children, ...props }: ColProps) => (
        <Col
          xs={8}
          sm={6}
          xl={4}
          key={mon && mon.id}
          style={{ marginBottom: 6 }}
          {...props}
        >
          {children}
        </Col>
      );
    } else {
      return ({ children, ...props }: ComponentProps<'div'>) => (
        <div {...props}>{children}</div>
      );
    }
  }, [withWrapper, mon]);

  const checkIsEvolutable = useCallback(() => {
    if (mon && isCollection(mon)) {
      if (!mon.nextMons || mon.nextMons.length === 0) return false;
      const requiredLv = mon.nextMons[0].requiredLv;
      return !!requiredLv && mon.level >= requiredLv;
    }
    return false;
  }, [mon]);

  const handleOnClickMix = useCallback(
    (mon: ICollection) => {
      setShowMonModal(false);
      onClickMix && onClickMix(mon);
    },
    [onClickMix, setShowMonModal]
  );

  const handleOnClickEvolute = useCallback(
    (mon: ICollection) => {
      setShowMonModal(false);
      onClickEvolute && onClickEvolute(mon);
    },
    [setShowMonModal, onClickEvolute]
  );

  return (
    <Wrapper className='mon-card-wrapper' {...restProps}>
      {!isMock && mon && isCollection(mon) && (
        <RankTag rankCd={mon.rankCd} codes={codes} />
      )}
      {!isMock && mon && isCollection(mon) && (
        <LevelTag level={mon.level} evolutable={checkIsEvolutable()} />
      )}
      <Card
        hoverable
        cover={renderCover()}
        onClick={onClick ? onClick : () => setShowMonModal(true)}
        className='mon-card'
        style={{ border: selected ? `1px solid ${COLOR.PRIMARY}` : undefined }}
        bordered={selected}
      >
        {overlay && (
          <div className='hp-overlay'>
            {React.cloneElement(overlay, {
              onShowMonModal: () => setShowMonModal(true),
            })}
          </div>
        )}
        <div className='cost-section'>
          <Cost
            cost={
              isMock
                ? null
                : mon
                ? ((isCollection(mon) && mon.mon) || (mon as IMon)).cost
                : null
            }
            isMock={isMock}
          />
        </div>
        <div className='attr-section'>{renderAttr()}</div>
      </Card>
      {bottomComponent}
      {!isMock && (
        <MonModal
          hideInfo={hideInfo}
          mon={mon}
          visible={showMonModal}
          onCancel={() => setShowMonModal(false)}
          codes={codes}
          prevMon={prevMon}
          mixable={mixable}
          onClickMix={handleOnClickMix}
          evolutable={evolutable}
          onClickEvolute={handleOnClickEvolute}
          user={user}
        />
      )}
    </Wrapper>
  );
};

export default memo(MonCard);
