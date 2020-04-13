import React, { Fragment } from 'react';
import styles from './App.module.scss';
import { Header, Routes, Sidebar } from './core';
import './styles/index.scss';
import 'antd/es/style/index.css';

const App: React.FC<any> = () => {

  return (
    <Fragment>
      <div className={styles.app}>
        <header>
          <Header />
        </header>
        <aside>
          <Sidebar />
        </aside>
        <main>
          <Routes />
        </main>
      </div>
    </Fragment>
  );
};

export default App;
