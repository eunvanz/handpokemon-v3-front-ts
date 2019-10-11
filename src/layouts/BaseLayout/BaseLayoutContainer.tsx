import React, { useContext, useCallback } from 'react';
import AppContext from '../../contexts/AppContext';
import BaseLayoutView from './BaseLayoutView';
import { ROUTES } from '../../App';
import { isScreenSize } from '../../libs/screenSize';
import { DRAWER_DEFAULT_OPEN_SCREEN_SIZE } from '../../constants/styles';
import ConfirmModal from '../../components/ConfirmModal/index';
import { useHistory } from 'react-router';
import { observer } from 'mobx-react';

const BaseLayoutContainer: React.FC = ({ children }) => {
  const { uiStore, userStore } = useContext(AppContext);
  const history = useHistory();

  const handleOnToggleDrawer = (show: boolean) => {
    show ? uiStore.showDrawer() : uiStore.hideDrawer();
  };

  const handleOnClickLogout = useCallback(() => {
    ConfirmModal({
      title: '로그아웃',
      content: '정말 로그아웃 하시겠습니까?',
      onOk: () => {
        userStore.logout();
        history.push(ROUTES.SIGN_IN);
      },
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleOnChangeRoute = useCallback((route: string) => {
    if (isScreenSize.smallerThan(DRAWER_DEFAULT_OPEN_SCREEN_SIZE)) {
      uiStore.hideDrawer();
    }
    history.push(route);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRefreshUser = useCallback(() => {
    userStore.signInUserWithToken();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <BaseLayoutView
      onToggleDrawer={handleOnToggleDrawer}
      isDrawerOpen={uiStore.isDrawerOpen}
      userStore={userStore}
      children={children}
      onClickLogout={handleOnClickLogout}
      onChangeRoute={handleOnChangeRoute}
      refreshUser={handleRefreshUser}
    />
  );
};

export default observer(BaseLayoutContainer);
