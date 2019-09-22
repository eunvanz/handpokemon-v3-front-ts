import React, { useState, useCallback, useEffect, ReactNode } from 'react';
import { Tag, Icon } from 'antd';
import moment from 'moment';
import './CreditTag.less';
import { CREDIT, CreditType } from '../../constants/rules';

interface ICreditTagProps {
  credit: number;
  lastTime?: string | null;
  type: CreditType;
  refreshUser: () => void;
}

const CreditTag = ({
  credit,
  lastTime,
  type,
  refreshUser,
}: ICreditTagProps) => {
  const [innerComponent, setInnerComponent] = useState<ReactNode>(
    <Icon type='loading' style={{ marginRight: 0 }} />
  );

  const getInnerComponent = useCallback(() => {
    const now = moment();
    const diff = now.diff(Number(lastTime));
    const restMillisec = CREDIT[type].INTERVAL - (diff % CREDIT[type].INTERVAL);
    if (credit === 0) {
      setInnerComponent(moment(restMillisec).format('mm:ss'));
    } else {
      setInnerComponent(credit);
    }
    // 크레딧 갱신 시 유저정보 같이 갱신
    if (restMillisec < 1000 && credit < CREDIT[type].MAX)
      setTimeout(refreshUser, restMillisec);
  }, [credit, lastTime, type, refreshUser]);

  useEffect(() => {
    getInnerComponent();
    const interval = setInterval(getInnerComponent, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [credit, lastTime, type, getInnerComponent]);

  return <Tag className='credit-tag'>{innerComponent}</Tag>;
};

export default CreditTag;
