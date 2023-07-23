/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../api/api";

export const chatApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // registerUser: builder.mutation({
    //   query: (data: IRegisterData) => ({
    //     url: `/auth/register`,
    //     method: `POST`,
    //     body: data,
    //   }),
    // }),

    getChats: builder.query({
      query: (id) => ({
        url: `/chat/${id}`,
      }),
    }),
  }),
});

export const { useGetChatsQuery } = chatApi;
