import { AxiosInstance, AxiosRequestConfig } from "axios";

export default class ApiModule {
  constructor(protected axiosInstance: AxiosInstance, protected prefix = '') { }

  public get(endpoint: string, config?: AxiosRequestConfig) {
    return this.request("get", endpoint, config);
  }

  public post(endpoint: string, data?: {}, config?: AxiosRequestConfig) {
    return this.request("post", endpoint, data, config);
  }

  public patch(endpoint: string, data?: {}, config?: AxiosRequestConfig) {
    return this.request("patch", endpoint, data, config);
  }

  public put(endpoint: string, data?: {}, config?: AxiosRequestConfig) {
    return this.request("put", endpoint, data, config);
  }

  public delete(endpoint: string, config?: AxiosRequestConfig) {
    return this.request("delete", endpoint, config);
  }

  protected async request(
    method: "get" | "post" | "patch" | "delete" | "put",
    endpoint: string,
    data?: {},
    config?: AxiosRequestConfig,
  ) {
    if (this.prefix) {
      if (!this.prefix.endsWith("/") && !endpoint.startsWith("/")) {
        this.prefix += "/";
      }

      endpoint = this.prefix + endpoint;
    }
    const response = await this.axiosInstance[method](endpoint, data, config);
    
    return response.data;
  }
}