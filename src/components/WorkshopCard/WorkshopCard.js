import React, { memo, useState, useEffect, useCallback } from 'react';
import { Card, Modal, Divider, Button, Tag } from 'antd';
import moment from 'moment';
import WrappedCommentList from '../WrappedCommentList';
import LikeButton from '../LikeButton/index';
import { COLOR } from '../../constants/styles';
import './WorkshopCard.less';
import { isAdminUser } from '../../libs/hpUtils';

const WorkshopModal = memo(
  ({
    visible,
    onCancel,
    workshop,
    onClickLike,
    likeLoading,
    user,
    onClickDelete,
    deleting,
    onRegisterAsMonImage
  }) => {
    const [renderCommentList, setRenderCommentList] = useState(false);
    const [registering, setRegistering] = useState(false);

    useEffect(() => {
      if (visible) {
        setRenderCommentList(true);
      } else {
        setRenderCommentList(false);
      }
    }, [visible, setRenderCommentList]);

    const handleOnRegisterAsMonImage = useCallback(() => {
      setRegistering(true);
      onRegisterAsMonImage(workshop).then(() => {
        setRegistering(false);
      });
    }, [onRegisterAsMonImage, workshop]);

    return (
      <Modal
        visible={visible}
        title='작품정보'
        onCancel={onCancel}
        footer={null}
        bodyStyle={{ padding: 0 }}
        centered
      >
        <div style={{ padding: 24, textAlign: 'center' }}>
          <img
            src={workshop.image}
            style={{ maxWidth: 250, margin: 'auto', marginBottom: 24 }}
            alt='공작소 이미지'
          />
          <div>
            <LikeButton
              onClick={onClickLike}
              loading={likeLoading}
              likes={workshop.likes}
              user={user}
              style={{ marginBottom: 12 }}
            />
            {user && workshop.userId === user.id && !workshop.registered && (
              <Button
                type='danger'
                style={{ marginLeft: 6 }}
                onClick={() => onClickDelete(workshop)}
                loading={deleting}
              >
                삭제
              </Button>
            )}
            {user && isAdminUser(user) && !workshop.registered && (
              <Button
                style={{ marginLeft: 6 }}
                onClick={handleOnRegisterAsMonImage}
                loading={registering}
              >
                이미지로 등록
              </Button>
            )}
          </div>
          <h3 className='c-primary'>{workshop.monName}</h3>
          <p>
            <span style={{ color: COLOR.GRAY }}>Designed by </span>
            <big className='c-primary'>{workshop.designer}</big>
          </p>
          <span style={{ color: COLOR.GRAY }}>
            @ {moment(workshop.createdAt).fromNow()}
          </span>
        </div>
        <Divider style={{ margin: 0 }} />
        <div>
          {renderCommentList && (
            <WrappedCommentList
              parent={{ key: 'workshopId', id: workshop.id }}
            />
          )}
        </div>
      </Modal>
    );
  }
);

const WorkshopCard = ({
  workshop,
  user,
  onClickLike,
  onClickDelete,
  deleting,
  onRegisterAsMonImage
}) => {
  const [showModal, setShowModal] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const handleOnClickLike = useCallback(
    e => {
      e.stopPropagation();
      setLikeLoading(true);
      onClickLike(workshop).then(() => setLikeLoading(false));
    },
    [onClickLike, workshop]
  );

  return (
    <>
      {!!workshop.registered && (
        <Tag className='registered-tag' color={COLOR.RED}>
          등록완료
        </Tag>
      )}
      <Card
        cover={
          <div style={{ position: 'relative', padding: 6 }}>
            <img
              src={workshop.image}
              alt='공작소 이미지'
              style={{ width: '100%' }}
            />
          </div>
        }
        style={{ cursor: 'pointer' }}
        bodyStyle={{ textAlign: 'center', padding: 6 }}
        onClick={() => setShowModal(true)}
      >
        <LikeButton
          onClick={handleOnClickLike}
          loading={likeLoading}
          likes={workshop.likes}
          user={user}
          size='small'
          style={{ marginBottom: 6 }}
        />
        <div>
          <small style={{ color: COLOR.GRAY }}>Designed by</small>
          <h4 className='c-primary'>{workshop.designer}</h4>
        </div>
      </Card>
      <WorkshopModal
        visible={showModal}
        onCancel={() => setShowModal(false)}
        workshop={workshop}
        user={user}
        onClickLike={handleOnClickLike}
        likeLoading={likeLoading}
        onClickDelete={onClickDelete}
        deleting={deleting}
        onRegisterAsMonImage={onRegisterAsMonImage}
      />
    </>
  );
};

export default memo(WorkshopCard);
