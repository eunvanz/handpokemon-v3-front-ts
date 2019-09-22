import React, { memo, useState, useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import moment from 'moment';
import 'moment/locale/ko';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import { COLOR } from '../../constants/styles';
import './ArticleCard.less';
import LikeButton from '../LikeButton/index';
import ArticleCommentList from '../ArticleCommentList';
import ConfirmModal from '../ConfirmModal/index';
import MessageModal from '../MessageMoal/index';

moment.locale('ko');

const ArticleCard = ({
  article,
  user,
  incrementViews,
  showUserModal,
  onReplaceItem,
  onClickLike,
  form,
  onWriteComment,
  onEditComment,
  onDeleteComment,
  onClickEdit,
  onDelete,
  onRemoveItem
}) => {
  const [showContent, setShowContent] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleOnClickMore = useCallback(() => {
    if (!showContent) {
      incrementViews(article);
      setShowContent(true);
      const newArticle = Object.assign({}, article, {
        views: article.views + 1
      });
      onReplaceItem(newArticle);
    } else {
      setShowContent(false);
    }
  }, [incrementViews, onReplaceItem, article, showContent]);

  const handleOnClickLike = useCallback(
    e => {
      e.stopPropagation();
      setLikeLoading(true);
      onClickLike({ article, user }).then(res => {
        if (res.data) {
          const newArticle = Object.assign({}, article, {
            likes: article.likes.concat([res.data])
          });
          onReplaceItem(newArticle);
        } else {
          const newArticle = Object.assign({}, article, {
            likes: article.likes.filter(like => like.userId !== user.id)
          });
          onReplaceItem(newArticle);
        }
        setLikeLoading(false);
      });
    },
    [article, user, onReplaceItem, onClickLike]
  );

  const handleOnClickDelete = useCallback(
    e => {
      e.stopPropagation();
      ConfirmModal({
        title: '게시물삭제',
        content: '정말 게시물을 삭제하시겠습니까?',
        onOk: () => {
          setDeleting(true);
          onDelete(article)
            .then(() => {
              setDeleting(false);
              MessageModal({
                type: 'success',
                title: '게시물삭제',
                content: '게시물이 삭제되었습니다.'
              });
              onRemoveItem(article);
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
    [article, onDelete, onRemoveItem]
  );

  const handleOnClickNickname = useCallback(
    e => {
      e.stopPropagation();
      showUserModal(article.user.id);
    },
    [showUserModal, article]
  );

  const handleOnClickEdit = useCallback(
    e => {
      e.stopPropagation();
      onClickEdit(article);
    },
    [onClickEdit, article]
  );

  return (
    <Card className='article-card' style={{ marginTop: 24 }}>
      <Card.Meta
        avatar={
          <Avatar
            className='hidden-max-sm'
            size={44}
            src={article.user.profileImage}
            icon={!article.user.profileImage ? 'user' : null}
          />
        }
        title={article.title}
        description={
          <div style={{ color: COLOR.GRAY, fontSize: '0.8rem' }}>
            by{' '}
            <span
              className='cursor-pointer c-primary'
              onClick={handleOnClickNickname}
            >
              {article.user.nickname}
            </span>{' '}
            <span className='created-date'>
              @ {moment(article.createdAt).fromNow()}
            </span>
            <span className='meta-info'>
              {' '}
              · 조회: {Number(article.views)} · 댓글:{' '}
              {Number(article.comments.length)} · 좋아요:{' '}
              {Number(article.likes.length)}
            </span>
          </div>
        }
      />
      <div style={{ marginTop: 24 }}>
        {!showContent && (
          <HTMLEllipsis
            unsafeHTML={article.content}
            maxLine='1'
            ellipsis='...'
            trimRight
            baseOn='letters'
            className='cursor-pointer'
            onClick={handleOnClickMore}
          />
        )}
        {showContent && <FroalaEditorView model={article.content} />}
        <div className='text-right'>
          <Button
            type='link'
            icon={showContent ? 'caret-up' : 'caret-down'}
            onClick={handleOnClickMore}
          >
            {showContent ? '접기' : '펼치기'}
          </Button>
        </div>
        {showContent && (
          <>
            <div className='text-center' style={{ marginBottom: 24 }}>
              <LikeButton
                onClick={handleOnClickLike}
                user={user}
                likes={article.likes}
                loading={likeLoading}
              />
              {user && article.user.id === user.id && (
                <Button
                  onClick={handleOnClickEdit}
                  style={{ marginLeft: 6 }}
                  disabled={deleting}
                >
                  수정
                </Button>
              )}
              {user && article.user.id === user.id && (
                <Button
                  type='danger'
                  onClick={handleOnClickDelete}
                  style={{ marginLeft: 6 }}
                  loading={deleting}
                >
                  삭제
                </Button>
              )}
            </div>
            <ArticleCommentList
              article={article}
              user={user}
              onClickUser={user => showUserModal(user.id)}
              form={form}
              onWrite={onWriteComment}
              onEdit={onEditComment}
              onDelete={onDeleteComment}
              onReplaceItem={onReplaceItem}
            />
          </>
        )}
      </div>
    </Card>
  );
};

export default memo(ArticleCard);
