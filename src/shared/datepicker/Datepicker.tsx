import React from 'react';
import ReactDatePicker, { ReactDatePickerProps, registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';

registerLocale('ru', ru);

interface OwnProps extends ReactDatePickerProps {
}

type Props = OwnProps;

const Datepicker: React.FC<Props> = (props) => {

  return (
    <div>
      <ReactDatePicker
        locale="ru"
        dateFormat="dd.MM.yyyy"
        {...props}
      />
    </div>
  );
};

export default Datepicker;
