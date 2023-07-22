/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../api/api";
import {
  ILoginCredential,
  IRegisterData,
} from "../../types";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data: IRegisterData) => ({
        url: `/auth/register`,
        method: `POST`,
        body: data,
      }),
    }),
    loginUser: builder.mutation({
      query: (credential: ILoginCredential) => ({
        url: "/auth/login",
        method: `POST`,
        body: credential,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
} = userApi;
