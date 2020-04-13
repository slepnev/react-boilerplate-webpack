import React from 'react';
import RowAnt, { RowProps } from 'antd/es/grid/row';
import 'antd/es/grid/style/index.css';

interface OwnProps extends RowProps {
}

type Props = OwnProps;

const Row: React.FC<Props> = (props) => {

  return (
    <RowAnt {...props} />
  );
};

export default Row;
