import { all, fork } from 'redux-saga/effects';
import { userInitialState, userReducer, UserState } from './user/reducer';
import { userSagas } from './user/sagas';

// The top-level state object
export interface ApplicationState {
  user: UserState;
  main?: any;
}

export const initialState = {
  user: userInitialState,
};

export const rootReducer = {
  user: userReducer,
};

export function* rootSaga() {
  yield all([
    fork(userSagas),
  ]);
}
