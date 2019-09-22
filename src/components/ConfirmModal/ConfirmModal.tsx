import { Modal } from 'antd';
import { ReactNode } from 'react';

interface IConfirmModalProps {
  title: ReactNode;
  content: ReactNode;
  okText?: string;
  cancelText?: string;
  onOk?: () => void;
}

export default ({
  title,
  content,
  okText = '예',
  cancelText = '아니오',
  onOk,
}: IConfirmModalProps) => {
  return Modal.confirm({
    title,
    content,
    okText,
    cancelText,
    onOk,
  });
};
