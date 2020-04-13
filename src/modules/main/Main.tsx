import React, { useEffect } from 'react';
import Datepicker from '../../shared/datepicker/Datepicker';
import { Col, Dropdown, modalConfirm, Row, Spinner, Tooltip } from '../../shared';
import Icon from '../../shared/icon/Icon';
import styles from './Main.module.scss';

interface OwnProps {
}

type Props = OwnProps;

const Main: React.FC<Props> = (props) => {

  useEffect(() => {
    modalConfirm({});
  }, []);

  return (
    <div>
      <h1>Main</h1>

      <Row gutter={100}>
        <Col className={styles.main__col} span={12}><Tooltip title={'Tooltip'}>
          <div>Tooltip</div>
        </Tooltip></Col>
        <Col className={styles.main__col} span={12}><Spinner>Spinner</Spinner></Col>
        <Col className={styles.main__col} span={12}><Datepicker onChange={val => console.log(val)} /></Col>
        <Col className={styles.main__col} span={12}>
          <Dropdown overlay={<div>List</div>}>
            <div>Dropdown</div>
          </Dropdown>
        </Col>
        <Col className={styles.main__col} span={12}><Icon name={'arrow-right'} /></Col>
      </Row>

    </div>
  );
};

export default Main;
