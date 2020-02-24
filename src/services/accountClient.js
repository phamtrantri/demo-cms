import axios, { AxiosInstance, AxiosResponse } from 'axios';

import configs from '../configs';
import { getItem } from '../utils/storage';

const api = axios.create({
  baseURL: configs.api.baseAuthURL,
  timeout: configs.api.timeout,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
});

export class AccountClientService {
  token: string;

  constructor(api: AxiosInstance) {
    this.api = api;

    this.init();
  }

  init() {}

  setHeader(key: string, value: string) {
    this.api.defaults.headers.common[key] = value;
  }

  deleteHeader(key: string) {
    delete this.api.defaults.headers.common[key];
  }

  toResult(request: Promise): Promise {
    return request.then((response: AxiosResponse) => {
      const { status, problem, data } = response;

      return {
        ok: status === 200,
        ...data,
        success:
          data && data.hasOwnProperty('success') && data.success === true,
        problem
      };
    });
  }

  get(path, options) {
    return this.toResult(this.api.get(path, options));
  }

  post(path, body, options) {
    return this.toResult(this.api.post(path, body, options));
  }

  put(path, body, options) {
    return this.toResult(this.api.put(path, body, options));
  }

  delete(path) {
    return this.toResult(this.api.delete(path));
  }
}

const accountClient = new AccountClientService(api);

export { accountClient };
