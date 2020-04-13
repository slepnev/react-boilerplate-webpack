import React from 'react';
import notificationAnt, { ArgsProps } from 'antd/es/notification';
import 'antd/es/notification/style/index.css';

export const notification = (props: ArgsProps) => notificationAnt.open(props);

