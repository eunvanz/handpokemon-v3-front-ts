import React, { memo, useCallback, useState } from 'react';
import { List, Avatar, Form, Input, Button } from 'antd';
import moment from 'moment';
import 'moment/locale/ko';
import SpinContainer from '../SpinContainer';
import MessageModal from '../MessageMoal/index';
import ConfirmModal from '../ConfirmModal/index';
import './CommentList.less';
import { COLOR } from '../../constants/styles';

moment.locale('ko');

const CommentList = ({
  comments,
  user,
  onClickUser,
  onWrite,
  form,
  onEdit,
  onDelete,
  parent,
  listActions
}) => {
  const [editTargetId, setEditTargetId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOnWrite = useCallback(() => {
    form.validateFields(['content'], (err, values) => {
      if (!err) {
        setLoading(true);
        const comment = {
          userId: user.id,
          content: values.content,
          [parent.key]: parent.id
        };
        onWrite(comment)
          .then(res => {
            setLoading(false);
            listActions.appendList('commentList', { content: [res.data] });
          })
          .catch(err => {
            MessageModal({
              type: 'error',
              content: err
            });
          })
          .finally(() => {
            form.resetFields();
          });
      }
    });
  }, [form, onWrite, parent, user, listActions]);

  const handleOnEdit = useCallback(
    comment => {
      form.validateFields(['editContent'], (err, values) => {
        if (!err) {
          setLoading(true);
          const newComment = Object.assign({}, comment, {
            content: values.editContent
          });
          onEdit(newComment)
            .then(() => {
              setLoading(false);
              setEditTargetId(null);
              listActions.replaceItem({
                key: 'commentList',
                conditionKey: 'id',
                value: newComment.id,
                item: newComment
              });
            })
            .catch(err => {
              MessageModal({
                type: 'error',
                content: err
              });
            });
        }
      });
    },
    [form, onEdit, listActions]
  );

  const handleOnDelete = useCallback(
    commentId => {
      ConfirmModal({
        title: '댓글삭제',
        content: '정말 삭제하시겠습니까?',
        onOk: () => {
          setLoading(true);
          onDelete(commentId)
            .then(() => {
              setLoading(false);
              listActions.removeItem({
                key: 'commentList',
                conditionKey: 'id',
                value: commentId
              });
            })
            .catch(err => {
              MessageModal({
                type: 'error',
                content: err
              });
            });
        }
      });
    },
    [onDelete, listActions]
  );

  const renderContent = useCallback(
    item => {
      if (item.id === editTargetId) {
        return (
          <Form>
            <Form.Item>
              {form.getFieldDecorator('editContent', {
                rules: [{ required: true, message: '내용을 입력해주세요.' }],
                initialValue: item.content
              })(
                <Input.TextArea
                  placeholder='내용을 입력해주세요.'
                  onPressEnter={() => handleOnEdit(item)}
                />
              )}
            </Form.Item>
            <div className='text-right'>
              <Button
                type='link'
                size='small'
                onClick={() => setEditTargetId(null)}
              >
                취소
              </Button>
              <Button
                type='primary'
                style={{ marginLeft: 6 }}
                onClick={() => handleOnEdit(item)}
                size='small'
              >
                수정하기
              </Button>
            </div>
          </Form>
        );
      } else {
        return item.content;
      }
    },
    [editTargetId, handleOnEdit, form]
  );

  return (
    <div style={{ padding: 24 }}>
      {loading && <SpinContainer />}
      <List
        className='comment-list'
        itemLayout='horizontal'
        dataSource={comments}
        locale={{
          emptyText: '댓글이 없습니다. 첫번째로 댓글을 남겨보세요.'
        }}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={item.user.profileImage}
                  icon={!item.user.profileImage ? 'user' : null}
                />
              }
              title={
                <div>
                  <span
                    className='cursor-pointer c-primary'
                    onClick={() => onClickUser(item.user)}
                  >
                    {item.user.nickname}
                  </span>{' '}
                  <span style={{ color: COLOR.GRAY }}>
                    · {moment(item.createdAt).fromNow()}
                  </span>
                </div>
              }
              description={
                <>
                  {renderContent(item)}
                  {user.id === item.userId &&
                    editTargetId !== item.id && [
                      <Button
                        key='edit'
                        size='small'
                        onClick={() => setEditTargetId(item.id)}
                        style={{ marginLeft: 6 }}
                        icon='edit'
                      />,
                      <Button
                        key='delete'
                        size='small'
                        type='danger'
                        onClick={() => handleOnDelete(item.id)}
                        style={{ marginLeft: 6 }}
                        icon='delete'
                      />
                    ]}
                </>
              }
            />
          </List.Item>
        )}
      />
      <Form style={{ marginTop: 24 }}>
        <Form.Item>
          {form.getFieldDecorator('content')(
            <Input.TextArea
              placeholder='댓글을 작성해주세요.'
              onPressEnter={handleOnWrite}
            />
          )}
        </Form.Item>
        {form.getFieldValue('content') && (
          <div className='text-right'>
            <Button type='primary' onClick={handleOnWrite}>
              등록하기
            </Button>
          </div>
        )}
      </Form>
    </div>
  );
};

export default memo(CommentList);
