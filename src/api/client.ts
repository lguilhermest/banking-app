import axios, { AxiosInstance, AxiosResponse } from 'axios';
import ApiModule from './module';

export default class ApiClient extends ApiModule {
  private token?: string;

  constructor(baseURL: string) {
    const axiosInstance = axios.create({
      baseURL,
      timeout: 10000,
    });

    super(axiosInstance, 'mobile');

    this.transformRequest(this.axiosInstance);
  }

  private transformRequest(instance: AxiosInstance) {
    instance.interceptors.request.use(
      config => {
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }
        return config;
      },
      error => Promise.reject(error),
    );

    instance.interceptors.response.use(
      response => response,
      error => Promise.reject(error),
    );
  }

  public onUnauthenticated(callback?: (response: AxiosResponse) => void) {
    this.axiosInstance.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status === 401) {
          callback?.(error);
        }
        return Promise.reject(error);
      },
    );
  }

  public setToken(token: string) {
    this.token = token;
  }

  public getToken() {
    return this.token;
  }

  public setAccount(account: number) {
    this.axiosInstance.defaults.headers.common['Account'] = account;
  }
}
