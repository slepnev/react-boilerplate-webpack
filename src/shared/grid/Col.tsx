import React from 'react';
import ColAnt, {ColProps} from 'antd/es/grid/col';

interface OwnProps extends ColProps {
}

type Props = OwnProps;

const Col: React.FC<Props> = (props) => {

  return (
    <ColAnt {...props} />
  );
};

export default Col;
