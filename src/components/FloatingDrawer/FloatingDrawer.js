import React, { memo, useState } from 'react';
import { Button, Drawer, Icon } from 'antd';
import classNames from 'classnames';
import './FloatingDrawer.less';

const FloatingDrawer = ({ children, icon, buttonText, title, active }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className='floating-drawer'>
      <Button
        className={classNames('floating-btn', open ? 'open' : null)}
        size='large'
        type='primary'
        onClick={() => setOpen(!open)}
      >
        <Icon type={icon} theme={active ? 'filled' : null} />
        {buttonText}
      </Button>
      <Drawer
        placement='right'
        closable
        onClose={() => setOpen(false)}
        visible={open}
        title={title}
        bodyStyle={{ padding: 0 }}
      >
        {children}
      </Drawer>
    </div>
  );
};

export default memo(FloatingDrawer);
