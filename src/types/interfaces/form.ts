import { Control, ValidationOptions } from 'react-hook-form';
import { Size } from '../enums/size';

export interface FormControl {
  control: Control;
  name: string;
  rules?: ValidationOptions;
  placeholder?: string;
  disable?: boolean;
  errors?: any;
  valid?: any;
  size?: Size;
}
