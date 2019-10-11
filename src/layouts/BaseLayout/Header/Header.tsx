import React, { useCallback } from 'react';
import { PageHeader, Affix, Button } from 'antd';

import './Header.less';
import imgLogo from '../../../imgs/logo.png';
import { IUser } from '../../../stores/models/userModel';

interface IHeaderViewProps {
  user?: IUser;
  onClickLogout: () => void;
  isDrawerOpen: boolean;
  onToggleDrawer: (isDrawerOpen: boolean) => void;
  onChangeRoute: (route: string) => void;
}

const HeaderView = ({
  user,
  onClickLogout,
  isDrawerOpen,
  onToggleDrawer,
  onChangeRoute,
}: IHeaderViewProps) => {
  const getExtraComponent = useCallback(() => {
    const component = [];
    if (user) {
      component.push(
        <Button
          type='primary'
          key='sign-up'
          icon='setting'
          onClick={() => onChangeRoute('/setting')}
        />
      );
      component.push(
        <Button
          type='primary'
          key='sign-in'
          icon='logout'
          onClick={onClickLogout}
        />
      );
    } else {
      component.push(
        <Button
          type='primary'
          key='sign-up'
          icon='user-add'
          onClick={() => onChangeRoute('/sign-up')}
        />
      );
      component.push(
        <Button
          type='primary'
          key='sign-in'
          icon='login'
          onClick={() => onChangeRoute('/sign-in')}
        />
      );
    }
    return component;
  }, [user, onChangeRoute, onClickLogout]);

  const onClickToggleDrawer = useCallback(() => {
    onToggleDrawer(!isDrawerOpen);
  }, [isDrawerOpen, onToggleDrawer]);

  return (
    <Affix offsetTop={0} style={{ zIndex: 1000 }}>
      <PageHeader
        className='hp-header'
        title={[
          <Button
            key='menu-btn'
            type='primary'
            icon={isDrawerOpen ? 'menu-fold' : 'menu-unfold'}
            onClick={onClickToggleDrawer}
          />,
          <img
            key='logo'
            className='logo'
            src={imgLogo}
            alt='로고'
            height={30}
            onClick={() => onChangeRoute('/')}
          />,
        ]}
        extra={getExtraComponent()}
      />
    </Affix>
  );
};

export default HeaderView;
