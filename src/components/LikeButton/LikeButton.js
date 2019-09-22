import React, { memo } from 'react';
import { Button, Icon } from 'antd';
import { COLOR } from '../../constants/styles';

const LikeButton = ({ onClick, user, likes, style, loading, ...restProps }) => {
  return (
    <Button onClick={onClick} style={style} {...restProps}>
      <Icon
        type={loading ? 'loading' : 'heart'}
        theme={
          user && likes.filter(like => like.userId === user.id).length > 0
            ? 'filled'
            : null
        }
        style={{ color: COLOR.RED }}
      />{' '}
      {Number(likes.length).toLocaleString()}
    </Button>
  );
};

export default memo(LikeButton);
