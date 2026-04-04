import { LoginReqI, LoginResI } from "_interfaces/auth-api.interfaces";
import { PagingDTO } from "_interfaces/pagination.interface";
import { GetUsersResI } from "_interfaces/user.interfaces";
import axios, { AxiosResponse } from "axios";

export const login = (body: LoginReqI): Promise<AxiosResponse<LoginResI>> => {
  return axios.post("https://api.example.com/login", body);
};

export const getUsers = (
  params: PagingDTO,
): Promise<AxiosResponse<GetUsersResI>> => {
  return axios.get(`${process.env.REACT_APP_REST_HOST}/auth/admin/user`, {
    params: { ...params },
  });
};

