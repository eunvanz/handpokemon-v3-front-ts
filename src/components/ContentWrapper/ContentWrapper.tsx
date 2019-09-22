import React, { ComponentProps } from 'react';
import classNames from 'classnames';
import './ContentWrapper.less';

const ContentWrapper = ({
  children,
  className,
  ...restProps
}: ComponentProps<'div'>) => {
  return (
    <div className={classNames('content-wrapper', className)} {...restProps}>
      {children}
    </div>
  );
};

export default ContentWrapper;
