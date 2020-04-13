import { Env } from '../types/enums/env';

export default function env() {
  return process.env.ENV || Env.Prod;
}
