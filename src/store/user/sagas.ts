import { userLoginAsync, userLogoutAsync } from './reducer';
import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import { User } from '../../types/interfaces/user';
import { authLogin, authLogout } from '../../api/auth';
import { removeStorage, saveStorage } from '../../utils/localStorage';
import errorHandler from '../../utils/errorHandler';


function* fetchUserLogin(action: ReturnType<typeof userLoginAsync.request>) {
  try {
    yield authLogin(action.payload);
    const res: User = {username: action.payload.username};

    yield put(userLoginAsync.success(res));
  } catch (error) {
    yield put(userLoginAsync.failure(error));
    errorHandler(error, 'При авторизации возникла ошика, попробуйще еще раз');
  }
}


function* fetchUserLogout() {
  try {
    yield authLogout();
    yield put(userLogoutAsync.success());
  } catch (error) {
    yield put(userLogoutAsync.failure(error));
    errorHandler(error, 'Не удалось выйти из системы, попробуйте еще раз');
  }
}

function* storageUserLogin(action: ReturnType<typeof userLoginAsync.success>) {
  yield call(saveStorage, 'user', action.payload);
}

function* storageUserLogout() {
  yield call(removeStorage, 'user');
}

function* watchUser() {
  yield takeLatest(userLoginAsync.request, fetchUserLogin);
  yield takeLatest(userLogoutAsync.request, fetchUserLogout);
  yield takeLatest(userLoginAsync.success, storageUserLogin);
  yield takeLatest(userLogoutAsync.success, storageUserLogout);
}

export const userSagas = function* () {
  yield all([
    fork(watchUser),
  ]);
};
