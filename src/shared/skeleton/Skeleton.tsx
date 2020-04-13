import React from 'react';
import 'antd/es/spin/style/index.css';
import SkeletonAnt, { SkeletonProps } from 'antd/es/skeleton';
import "antd/es/skeleton/style/index.css";


interface OwnProps extends SkeletonProps {
}

type Props = OwnProps;

const Skeleton: React.FC<Props> = (props) => {

  return (
    <SkeletonAnt {...props} />
  );
};

export default Skeleton;
