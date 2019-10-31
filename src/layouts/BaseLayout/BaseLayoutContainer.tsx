import React, { useCallback } from 'react';
import BaseLayoutView from './BaseLayoutView';
import { useSelector, useDispatch } from 'react-redux';
import { ROUTES } from '../../App';
import { isScreenSize } from '../../libs/screenSize';
import { DRAWER_DEFAULT_OPEN_SCREEN_SIZE } from '../../constants/styles';
import ConfirmModal from '../../components/ConfirmModal/index';
import { useHistory } from 'react-router';
import { IStoreState } from '../../stores';
import { showDrawer } from '../../stores/uiReducer';
import { clearUser, signInUserWithToken } from '../../stores/userReducer';

const BaseLayoutContainer: React.FC = ({ children }) => {
  const { uiStore, userStore } = useSelector((state: IStoreState) => ({
    uiStore: state.uiStore,
    userStore: state.userStore,
  }));

  const dispatch = useDispatch();

  const history = useHistory();

  const handleOnToggleDrawer = (show: boolean) => {
    dispatch(showDrawer(show));
  };

  const handleOnClickLogout = useCallback(() => {
    ConfirmModal({
      title: '로그아웃',
      content: '정말 로그아웃 하시겠습니까?',
      onOk: () => {
        dispatch(clearUser());
        history.push(ROUTES.SIGN_IN);
      },
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleOnChangeRoute = useCallback((route: string) => {
    if (isScreenSize.smallerThan(DRAWER_DEFAULT_OPEN_SCREEN_SIZE)) {
      dispatch(showDrawer(false));
    }
    history.push(route);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRefreshUser = useCallback(() => {
    dispatch(signInUserWithToken());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <BaseLayoutView
      onToggleDrawer={handleOnToggleDrawer}
      isDrawerOpen={uiStore.isDrawerOpen}
      user={userStore.user}
      children={children}
      onClickLogout={handleOnClickLogout}
      onChangeRoute={handleOnChangeRoute}
      refreshUser={handleRefreshUser}
    />
  );
};

export default BaseLayoutContainer;
