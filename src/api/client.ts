import axios, { AxiosInstance, AxiosResponse } from 'axios';
import ApiModule from './module';

export default class ApiClient extends ApiModule {
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
      config => config,
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
}
