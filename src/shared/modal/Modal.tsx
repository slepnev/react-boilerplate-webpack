import React from 'react';
import ModalAnt, { ModalFuncProps, ModalProps } from 'antd/es/modal';
import 'antd/es/modal/style/index.css';
import styles from './Modal.module.scss';

interface OwnProps extends ModalProps {
}

type Props = OwnProps;

const Modal: React.FC<Props> = (props) => {
  return (
    <ModalAnt className={styles.modal} {...props}>
      {props.children}
    </ModalAnt>
  );
};

export default Modal;

export const modalConfirm = (props: ModalFuncProps) => ModalAnt.confirm({
  className: styles.modal,
  icon: null,
  zIndex: 1060,
  title: 'Подтверждение',
  content: 'Вы уверены что хотите подтвердить?',
  okText: 'Да',
  cancelText: 'Отмена',
  ...props
});

