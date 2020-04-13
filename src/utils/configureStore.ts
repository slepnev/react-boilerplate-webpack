import { rootReducer, rootSaga } from '../store';
import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';

interface AsyncStore extends Store {
  asyncReducers: any,
  injectReducer: (...args: any[]) => void,
  dispatch: any,

  [key: string]: any
}

export default function configureStore(initialState: any): AsyncStore {
  const composeEnhancers = composeWithDevTools({});
  const sagaMiddleware = createSagaMiddleware();
  const reducers = createReducer();

  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  ) as AsyncStore;

  store.asyncReducers = {};

  store.injectReducer = (key: string, asyncReducer: any) => {
    store.asyncReducers[key] = asyncReducer;
    store.replaceReducer(createReducer(store.asyncReducers));
  };

  store.injectSaga = createSagaInjector(sagaMiddleware.run, rootSaga);

  return store;
}

function createReducer(asyncReducers = {}) {
  return combineReducers({
    ...rootReducer,
    ...asyncReducers,
  });
}

function createSagaInjector(runSaga: any, rootSaga: any) {
  const injectedSagas = new Map();

  const isInjected = (key: string) => injectedSagas.has(key);

  const injectSaga = (key: string, saga: any) => {
    if (isInjected(key)) return;

    const task = runSaga(saga);

    injectedSagas.set(key, task);
  };

  injectSaga('root', rootSaga);

  return injectSaga;
}
