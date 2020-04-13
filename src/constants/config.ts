import { Env } from '../types/enums/env';
import env from '../utils/env';

const local = {
  ENV: Env.Local,
};

const dev = {
  ENV: Env.Dev,
};

const prod = {
  ENV: Env.Prod,
};

let config = {};

switch (env()) {
  case Env.Local:
    config = local;
    break;
  case Env.Dev:
    config = dev;
    break;
  default:
    config = prod;
}

export default {
  API_URL: 'http://localhost:3001/api/v1',
  PUBLIC_URL: process.env.PUBLIC_URL,
  BASENAME: '',
  ...config
};
