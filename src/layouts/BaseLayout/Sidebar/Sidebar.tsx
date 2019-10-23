import React, { useState, useCallback, useEffect } from 'react';
import { Menu, Icon, List, Avatar, Tag } from 'antd';
import './Sidebar.less';
import CreditTag from '../../../components/CreditTag';
import { CreditType } from '../../../constants/rules';
import { useHistory } from 'react-router';
import { IUser } from '../../../stores/models/userModel';
import { IUserItem } from '../../../stores/models/userItemModel';
import { observer } from 'mobx-react';

interface ISidebarViewProps {
  user?: IUser;
  userItems?: IUserItem[];
  onChangeRoute: (route: string) => void;
  refreshUser: () => void;
}

const SidebarView = ({
  user,
  onChangeRoute,
  refreshUser,
  userItems,
}: ISidebarViewProps) => {
  const history = useHistory();
  const [selectedKeys, setSelectedKeys] = useState([history.location.pathname]);

  useEffect(() => {
    setSelectedKeys([history.location.pathname]);
  }, [history.location.pathname]);

  const onClickMenuItem = useCallback(
    key => {
      setSelectedKeys([key]);
      onChangeRoute(key);
    },
    [onChangeRoute]
  );

  return (
    <div className='hp-sidebar-mask'>
      <div className='hp-sidebar'>
        <List.Item.Meta
          className='user-info'
          avatar={
            <Avatar
              src={(user && user.profileImage) || undefined}
              icon='user'
            />
          }
          title={user ? `${user.nickname}님, 안녕?` : '로그인을 해주세요.'}
        />
        <Menu theme='dark' mode='inline' selectedKeys={selectedKeys}>
          <Menu.Item key='/' onClick={() => onClickMenuItem('/')}>
            <Icon type='home' />
            <span>홈</span>
          </Menu.Item>
          {user && (
            <Menu.Item
              key='/collection/user'
              onClick={() => onClickMenuItem('/collection/user')}
            >
              <Icon type='appstore' />
              <span>
                내 콜렉션
                {user && (
                  <Tag className='credit-tag'>
                    {Number(user.colPoint).toLocaleString()}점
                  </Tag>
                )}
              </span>
            </Menu.Item>
          )}
          {user && (
            <Menu.Item key='/book' onClick={() => onClickMenuItem('/book')}>
              <Icon type='book' />
              <span>내 도감</span>
            </Menu.Item>
          )}
          {user && (
            <Menu.Item
              key='/achievement'
              onClick={() => onClickMenuItem('/achievement')}
            >
              <Icon type='crown' />
              <span>내 업적</span>
            </Menu.Item>
          )}
          {user && (
            <Menu.Item
              key='/giftbox'
              onClick={() => onClickMenuItem('/giftbox')}
            >
              <Icon type='gift' />
              <span>내 선물함</span>
              {userItems && userItems.length > 0 && (
                <Tag className='credit-tag'>
                  {Number(userItems.length).toLocaleString()}
                </Tag>
              )}
            </Menu.Item>
          )}
          <Menu.Item key='/pick' onClick={() => onClickMenuItem('/pick')}>
            <Icon type='experiment' />
            <span>
              포켓몬 채집
              {user && (
                <CreditTag
                  credit={user.pickCredit}
                  lastTime={user.lastPick}
                  type={CreditType.PICK}
                  refreshUser={refreshUser}
                />
              )}
            </span>
          </Menu.Item>
          <Menu.Item key='/battle' onClick={() => onClickMenuItem('/battle')}>
            <Icon type='fire' />
            <span>포켓몬 시합</span>
            {user && (
              <CreditTag
                credit={user.battleCredit}
                lastTime={user.lastBattle}
                type={CreditType.BATTLE}
                refreshUser={refreshUser}
              />
            )}
          </Menu.Item>
          <Menu.SubMenu
            key='ranking'
            title={
              <span>
                <Icon type='trophy' />
                <span>랭킹</span>
              </span>
            }
          >
            <Menu.Item
              key='/ranking/collection'
              onClick={() => onClickMenuItem('/ranking/collection')}
            >
              <span>콜렉션랭킹</span>
            </Menu.Item>
            <Menu.Item
              key='/ranking/battle'
              onClick={() => onClickMenuItem('/ranking/battle')}
            >
              <span>시합랭킹</span>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key='/shop' onClick={() => onClickMenuItem('/shop')}>
            <Icon type='shop' />
            <span>상점</span>
            {user && (
              <Tag className='credit-tag'>
                {Number(user.pokemoney).toLocaleString()}P
              </Tag>
            )}
          </Menu.Item>
          <Menu.SubMenu
            key='community'
            title={
              <span>
                <Icon type='coffee' />
                <span>커뮤니티</span>
              </span>
            }
          >
            <Menu.Item
              key='/community/notice'
              onClick={() => onClickMenuItem('/community/notice')}
            >
              <span>공지사항</span>
            </Menu.Item>
            <Menu.Item
              key='/community/free'
              onClick={() => onClickMenuItem('/community/free')}
            >
              <span>자유게시판</span>
            </Menu.Item>
            <Menu.Item
              key='/community/guide'
              onClick={() => onClickMenuItem('/community/guide')}
            >
              <span>게임가이드</span>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item
            key='/workshop'
            onClick={() => onClickMenuItem('/workshop')}
          >
            <Icon type='tool' />
            <span>포켓몬 공방</span>
          </Menu.Item>
          <Menu.SubMenu
            key='secret-garden'
            title={
              <span>
                <Icon type='dashboard' />
                <span>관리자</span>
              </span>
            }
          >
            <Menu.Item
              key='/secret-garden/create-mon'
              onClick={() => onClickMenuItem('/secret-garden/create-mon')}
            >
              <span>포켓몬 등록</span>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </div>
    </div>
  );
};

export default observer(SidebarView);
