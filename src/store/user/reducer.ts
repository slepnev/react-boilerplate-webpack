import { User } from '../../types/interfaces/user';
import { Action, createAsyncAction, createReducer } from 'typesafe-actions';
import { ApplicationState } from '../index';
import { loadStorage } from '../../utils/localStorage';

// Types
export enum UserActionTypes {
  LOG_IN_REQUEST = 'USER/LOG_IN_REQUEST',
  LOG_IN_SUCCESS = 'USER/LOG_IN_SUCCESS',
  LOG_IN_ERROR = 'USER/LOG_IN_ERROR',
  LOG_OUT_REQUEST = 'USER/LOG_OUT_REQUEST',
  LOG_OUT_SUCCESS = 'USER/LOG_OUT_SUCCESS',
  LOG_OUT_ERROR = 'USER/LOG_OUT_ERROR',
}

export interface UserState {
  readonly loading: boolean;
  readonly data: User | null;
  readonly error?: string;
}

// Actions
export const userLoginAsync = createAsyncAction(
  UserActionTypes.LOG_IN_REQUEST,
  UserActionTypes.LOG_IN_SUCCESS,
  UserActionTypes.LOG_IN_ERROR
)<any, User, Error>();

export const userLogoutAsync = createAsyncAction(
  UserActionTypes.LOG_OUT_REQUEST,
  UserActionTypes.LOG_OUT_SUCCESS,
  UserActionTypes.LOG_OUT_ERROR
)<undefined, undefined, Error>();

// Reducer
const defaultUser: User = {
  username: ''
};

export const userInitialState: UserState = {
  data: loadStorage('user'),
  error: undefined,
  loading: false
};

const reducer = createReducer<UserState, Action<UserActionTypes>>(userInitialState);
export const userReducer = reducer
  .handleAction(userLoginAsync.request, (state, {payload}) => ({
    ...state, loading: true
  }))
  .handleAction(userLoginAsync.success, (state, {payload}) => ({
    ...state, data: payload, loading: false
  }))
  .handleAction(userLoginAsync.failure, (state, {payload}) => ({
    ...state, data: null, error: payload.message, loading: false
  }))
  .handleAction(userLogoutAsync.request, (state) => ({
    ...state, loading: true
  }))
  .handleAction(userLogoutAsync.success, (state) => ({
    ...state, data: null, loading: false
  }))
  .handleAction(userLogoutAsync.failure, (state, {payload}) => ({
    ...state, error: payload.message, loading: false
  }));

// Selectors
export const selectUserData = (state: ApplicationState) => state.user.data || defaultUser;
export const selectUserLoading = (state: ApplicationState) => state.user.loading;
