import React, { ReactNode } from 'react';
import { Layout } from 'antd';
import classNames from 'classnames';
import Header from './Header/index';
import Sidebar from './Sidebar/index';
import Content from './Content/index';
import './BaseLayout.less';
import UserStore from '../../stores/userStore';
import { observer } from 'mobx-react';

interface IBaseLayoutViewProps {
  isDrawerOpen: boolean;
  onToggleDrawer: (show: boolean) => void;
  userStore?: UserStore;
  onClickLogout: () => void;
  onChangeRoute: (route: string) => void;
  refreshUser: () => void;
  children: ReactNode;
}

const BaseLayoutView = ({
  isDrawerOpen,
  onToggleDrawer,
  userStore,
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
        user={userStore && userStore.user}
        onToggleDrawer={onToggleDrawer}
        onClickLogout={onClickLogout}
        onChangeRoute={onChangeRoute}
        isDrawerOpen={isDrawerOpen}
      />
      <Layout className='hp-content-layout'>
        <Sidebar
          user={userStore && userStore.user}
          onChangeRoute={onChangeRoute}
          refreshUser={refreshUser}
        />
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default observer(BaseLayoutView);
