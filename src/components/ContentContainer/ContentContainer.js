import React, { memo } from 'react';
import classNames from 'classnames';
import './ContentContainer.less';

const ContentContainer = ({ children, className, ...restProps }) => {
  return (
    <div className={classNames('content-container', className)} {...restProps}>
      {children}
    </div>
  );
};

export default memo(ContentContainer);
