import { Action, createReducer } from 'typesafe-actions';
import { ApplicationState } from '../index';

// Types
export enum MainActionTypes {
}

export interface MainState {
  readonly loading: boolean;
  readonly data: any | null;
  readonly error?: string;
}

// Actions

// Reducer
export const mainInitialState: any = {
  data: null,
  error: undefined,
  loading: false,
};

const reducer = createReducer<MainState, Action<any>>(mainInitialState);
export const mainReducer = reducer;

// Selectors
export const selectMain = (state: ApplicationState): any => state.main;
