import React from 'react';
import { compose } from 'redux';
import withUser from '../../hocs/withUser';
import { getLikes, deleteLikeById, postLike } from '../../api/requestLike';
import withList from '../../hocs/withList';
import LikeButton from '../LikeButton/index';
import { Icon } from 'antd';

class WrappedLikeButton extends React.PureComponent {
  state = {
    loading: false
  };

  componentDidMount() {
    const { listActions, parent } = this.props;
    listActions.fetchAndAppendList({
      key: 'likeList',
      request: () =>
        getLikes({
          conditionKey: parent.key,
          conditionValue: parent.id
        }),
      reset: true
    });
  }

  _handleOnClick = e => {
    e.stopPropagation();
    const { likeList, user, listActions, parent } = this.props;
    const userLike = likeList.content.filter(
      item => item.userId === user.id
    )[0];
    if (userLike) {
      this.setState({ loading: true });
      deleteLikeById(userLike.id).then(() => {
        listActions.removeItem({
          key: 'likeList',
          conditionKey: 'id',
          value: userLike.id
        });
        this.setState({ loading: false });
      });
    } else {
      this.setState({ loading: true });
      postLike({
        [parent.key]: parent.id
      }).then(res => {
        listActions.appendList('likeList', { content: [res.data] });
        this.setState({ loading: false });
      });
    }
  };

  render() {
    const { user, likeList, style } = this.props;
    if (!likeList)
      return (
        <div style={{ height: 32 }}>
          <Icon type='loading' />
        </div>
      );
    return (
      <LikeButton
        onClick={this._handleOnClick}
        user={user}
        likes={likeList.content}
        loading={this.state.loading}
        style={style}
      />
    );
  }
}

export default compose(
  withUser(),
  withList([
    {
      key: 'likeList'
    }
  ])
)(WrappedLikeButton);
