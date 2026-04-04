import { Api } from "../api";
import type { UserAuthenticatedResI } from "@/_interfaces/profile.interfaces";

const prefix = "/user/v1";

export const userApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getUserInfo: build.query<UserAuthenticatedResI, void>({
      query: () => ({ url: `${prefix}/`, method: "GET" }),
      providesTags: ["User"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserInfoQuery, useLazyGetUserInfoQuery } = userApi;
