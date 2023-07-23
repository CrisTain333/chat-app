/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../api/api";

export const messageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // registerUser: builder.mutation({
    //   query: (data: IRegisterData) => ({
    //     url: `/auth/register`,
    //     method: `POST`,
    //     body: data,
    //   }),
    // }),

    getMessages: builder.query({
      query: (id) => ({
        url: `/message/${id}`,
      }),
      providesTags: ["messages"],
    }),
  }),
});

export const { useGetMessagesQuery } = messageApi;
