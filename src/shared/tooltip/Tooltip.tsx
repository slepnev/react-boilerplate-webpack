import React from 'react';
import TooltipAnt, { TooltipPropsWithTitle } from 'antd/es/tooltip';
import 'antd/es/tooltip/style/index.css';

interface OwnProps extends TooltipPropsWithTitle {
}

type Props = OwnProps;

const Tooltip: React.FC<Props> = (props) => {

  return (
    <TooltipAnt {...props}>
      {props.children}
    </TooltipAnt>
  );
};

export default Tooltip;

