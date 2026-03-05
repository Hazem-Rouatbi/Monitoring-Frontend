import axios from "axios";
import * as localstorage from "./LocalStorage";
import { useEffect } from "react";
import { logoutUser } from "../actions/auth";
// axios instance
const instance = axios.create({
  timeout: 100000,
  headers: { Authorization: 'Bearer ' + localstorage.loadAccess() },
  baseURL: `https://monitoring-api.paypos.tn/api`
})

const AxiosInterceptor = ({ children }) => {
  console.info('interceptor')

  useEffect(() => {
    const resInterceptor = (response) => {
      return response;
    };
    const errInterceptor = (error) => {
      if (error.response.status === 401 || error.response.status === 401) {
        logoutUser();
        localstorage.emptystorage();
        window.location.href = "/#/login";
      }

      return Promise.reject()
    }

    const interceptor = instance.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );

    return () => instance.interceptors.response.eject(interceptor);
  }, []);

  return children;
};

export default instance;
export { AxiosInterceptor };
