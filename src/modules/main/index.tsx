import React from 'react';
import Spinner from '../../shared/spinner/Spinner';
import { store } from '../../index';


const MainBundle = React.lazy(() => import(
  /* webpackChunkName: 'home' */
  /* webpackPrefetch: 10 */
  '../../store/main'
  ).then(module => {
  store.injectReducer('main', module.mainReducer);
  store.injectSaga('main', module.mainSagas);

  return import(
    /* webpackChunkName: 'home' */
    /* webpackPrefetch: 10 */
    './Main'
    );
}));

const MainModule = () => (
  <React.Suspense fallback={<Spinner />}>
    <MainBundle />
  </React.Suspense>
);

export default MainModule;
