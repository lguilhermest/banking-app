import { AxiosInstance, AxiosRequestConfig } from 'axios';

export default class ApiModule {
  constructor(
    protected axiosInstance: AxiosInstance,
    protected prefix = '',
  ) {}

  public get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request('get', endpoint, undefined, config);
  }

  public post<T, D = unknown>(
    endpoint: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request('post', endpoint, data, config);
  }

  public patch<T, D = unknown>(
    endpoint: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request('patch', endpoint, data, config);
  }

  public put<T, D = unknown>(
    endpoint: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request('put', endpoint, data, config);
  }

  public delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request('delete', endpoint, undefined, config);
  }

  protected async request<T, D>(
    method: 'get' | 'post' | 'patch' | 'delete' | 'put',
    endpoint: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    if (this.prefix) {
      if (!this.prefix.endsWith('/') && !endpoint.startsWith('/')) {
        this.prefix += '/';
      }

      endpoint = this.prefix + endpoint;
    }
    const response = await this.axiosInstance[method](endpoint, data, config);

    return response.data;
  }
}
