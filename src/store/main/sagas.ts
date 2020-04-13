import { fork, all } from "redux-saga/effects";

function* watchMain() {
  yield true;
}

export const mainSagas = function* () {
  yield all([
    fork(watchMain),
  ]);
};
