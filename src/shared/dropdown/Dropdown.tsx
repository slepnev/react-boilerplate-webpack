import React from 'react';
import DropdownAnt, { DropDownProps } from 'antd/es/dropdown';
import 'antd/es/dropdown/style/index.css';


interface OwnProps extends DropDownProps {
}

type Props = OwnProps;

const Dropdown: React.FC<Props> = (props) => {

  return (
    <div>
      <DropdownAnt {...props} />
    </div>
  );
};

export default Dropdown;
