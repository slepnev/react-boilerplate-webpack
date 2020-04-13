import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { axiosConfig } from './http';

const httpMock = axios.create(axiosConfig);
const httpMockAdapter = new MockAdapter(httpMock, {delayResponse: 1000});

export {
  httpMock,
  httpMockAdapter
};
