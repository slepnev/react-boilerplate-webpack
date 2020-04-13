import { ReactComponent as ArrowLeft } from '../../assets/icons/arrow-left.svg';
import { ReactComponent as ArrowRight } from '../../assets/icons/arrow-right.svg';
import { ReactComponent as ArrowBottom } from '../../assets/icons/arrow-bottom.svg';
import React from 'react';

export type IconType =
  'arrow-left' |
  'arrow-right' |
  'arrow-bottom';

const ICONS: { [key: string]: any } = {
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'arrow-bottom': ArrowBottom,
};

interface OwnProps {
  name: IconType;
  color?: string;
  size?: number;
}

type Props = OwnProps;

const Icon: React.FC<Props> = ({name, color, size = 16}) => {
  const params = {
    fill: color || 'currentColor',
    width: size,
    height: size
  };

  if (ICONS[name]) {
    const Component = ICONS[name];

    return <Component {...params} />;
  } else {
    return null;
  }
};

export default Icon;
