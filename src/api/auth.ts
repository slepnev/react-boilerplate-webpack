import http from '../utils/http';
import { httpMock, httpMockAdapter } from '../utils/httpMock';

export const apiAuth = {
  login: '/login',
  logout: '/logout',
};

export const authLogin = (data: any) =>
  httpMock.post(apiAuth.login, data);

export const authLogout = () =>
  httpMock.post(apiAuth.logout);

httpMockAdapter
  .onPost(apiAuth.login).reply(200)
  .onPost(apiAuth.logout).reply(200);
