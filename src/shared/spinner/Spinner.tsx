import React from 'react';
import Spin, { SpinProps } from 'antd/es/spin';
import 'antd/es/spin/style/index.css';

interface OwnProps extends SpinProps {
}

type Props = OwnProps;

const Spinner: React.FC<Props> = (props) => {

  return (
    <Spin {...props}/>
  );
};

export default Spinner;
