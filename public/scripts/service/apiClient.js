import client from './client';
import superagent from 'superagent';
import {apiBasePath} from '../../../config.json';

export const authenticateUser = (username, password) =>
  superagent.agent().post(`${apiBasePath}/users/authenticate`)
    .withCredentials()
    .send({username, password})
    .set('Accept', 'application/json')

export const checkToken = () =>
  superagent.agent().post(`${apiBasePath}/token`)
    .withCredentials()

export const invalidateToken = username =>
  superagent.post(`${apiBasePath}/token/invalidate`)
  .withCredentials()
  .send({username})
  .set('Accept', 'accplication/json')
