import { Modal } from 'antd';
import { ModalFuncProps } from 'antd/lib/modal';

export enum MessageModalType {
  error = 'error',
  success = 'success',
  warning = 'warning',
  info = 'info',
}

interface IMessageModalProps extends ModalFuncProps {
  type: MessageModalType;
  title?: string;
  content: string;
  onOk?: () => void;
}

export default ({
  type,
  title,
  content,
  onOk,
  ...props
}: IMessageModalProps) => {
  return Modal[type]({
    title: type === MessageModalType.error && !title ? '피카피카!' : title,
    content: content,
    okText: '확인',
    onOk,
    ...props,
  });
};
