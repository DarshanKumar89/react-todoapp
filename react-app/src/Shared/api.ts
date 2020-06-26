import axios, { AxiosRequestConfig } from "axios";
import { getStoredAuthToken, removeStoredAuthToken } from "../Utils/authToken";
import { message } from "antd";

interface PropsTypes {
  method: string;
  url: string;
  variables: any;
}

const defaults: AxiosRequestConfig = {
  baseURL: process.env.API_URL || "http://localhost:8081",
  headers: () => ({
    "Content-Type": "application/json",
    Authorization: getStoredAuthToken() ? getStoredAuthToken() : undefined,
  }),
};

const api = (method: any, url: string, variables: any) =>
  new Promise((resolve, reject) => {
    axios({
      url: `${defaults.baseURL}${url}`,
      method,
      headers: defaults.headers(),
      params: method === "get" ? variables : undefined,
      data: method !== "get" ? variables : undefined,
    }).then(
      (response) => {
        resolve(response.data);
      },
      (error) => {
        if (error.response) {
          console.log(error.response);
          message.error(error.response.data.message);
          if (error.response.status === 401) {
            removeStoredAuthToken();
            let Window: any = window;
            Window.location.replace("/login");
          } else {
            reject(error.response.data.error);
          }
        } else {
          reject(error.response);
        }
      }
    );
  });

export default {
  get: (url: string) => api("get", url, null),
  post: (url: string, variables: any) => api("post", url, variables),
  put: (url: string, variables: any) => api("put", url, variables),
  delete: (url: string, variables: any) => api("delete", url, variables),
};
