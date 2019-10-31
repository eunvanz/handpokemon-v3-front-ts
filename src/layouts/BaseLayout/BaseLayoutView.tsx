import React, { ReactNode } from 'react';
import { Layout } from 'antd';
import classNames from 'classnames';
import Header from './Header/index';
import Sidebar from './Sidebar/index';
import Content from './Content/index';
import './BaseLayout.less';
import { IUser } from '../../stores/models/userModel';

interface IBaseLayoutViewProps {
  isDrawerOpen: boolean;
  onToggleDrawer: (show: boolean) => void;
  user?: IUser;
  onClickLogout: () => void;
  onChangeRoute: (route: string) => void;
  refreshUser: () => void;
  children: ReactNode;
}

const BaseLayoutView = ({
  isDrawerOpen,
  onToggleDrawer,
  user,
  onClickLogout,
  onChangeRoute,
  refreshUser,
  children,
}: IBaseLayoutViewProps) => {
  return (
    <Layout
      className={classNames(
        'hp-base-layout',
        isDrawerOpen ? 'show-drawer' : 'hide-drawer'
      )}
    >
      <Header
        user={user}
        onToggleDrawer={onToggleDrawer}
        onClickLogout={onClickLogout}
        onChangeRoute={onChangeRoute}
        isDrawerOpen={isDrawerOpen}
      />
      <Layout className='hp-content-layout'>
        <Sidebar
          user={user}
          onChangeRoute={onChangeRoute}
          refreshUser={refreshUser}
        />
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default BaseLayoutView;
