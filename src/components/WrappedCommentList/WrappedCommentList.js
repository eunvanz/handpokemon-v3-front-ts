import React from 'react';
import { compose } from 'redux';
import CommentList from '../CommentList';
import withUser from '../../hocs/withUser';
import withUserModal from '../../hocs/withUserModal';
import withForm from '../../hocs/withForm';
import {
  postComment,
  putComment,
  deleteCommentById,
  getComments
} from '../../api/requestComment';
import withList from '../../hocs/withList';
import SpinContainer from '../SpinContainer';

class WrappedCommentList extends React.PureComponent {
  componentDidMount() {
    const { listActions, parent } = this.props;
    listActions.fetchAndAppendList({
      key: 'commentList',
      request: () =>
        getComments({
          curPage: 1,
          perPage: 999999,
          conditionKey: parent.key,
          conditionValue: parent.id
        }),
      reset: true
    });
  }

  render() {
    const {
      commentList,
      showUserModal,
      user,
      form,
      parent,
      listActions
    } = this.props;
    if (!commentList) return <SpinContainer />;
    return (
      <CommentList
        comments={commentList.content}
        user={user}
        onClickUser={user => showUserModal(user.id)}
        form={form}
        onEdit={putComment}
        onWrite={postComment}
        onDelete={deleteCommentById}
        parent={parent}
        listActions={listActions}
      />
    );
  }
}

export default compose(
  withUser(),
  withUserModal,
  withForm,
  withList([
    {
      key: 'commentList'
    }
  ])
)(WrappedCommentList);
