/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../api/api";

export const chatApi = api.injectEndpoints({
  endpoints: (builder) => ({
    postMessage: builder.mutation({
      query: (data: any) => ({
        url: `/message`,
        method: `POST`,
        body: data,
      }),
      invalidatesTags: ["chats", "messages"],
    }),

    getChats: builder.query({
      query: (id) => ({
        url: `/chat/${id}`,
      }),
      providesTags: ["chats"],
    }),

    createChat: builder.mutation({
      query: (data) => ({
        url: `/chat/create-chat`,
        method: `POST`,
        body: data,
      }),
      invalidatesTags: ["chats", "messages"],
    }),
  }),
});

export const {
  useGetChatsQuery,
  usePostMessageMutation,
  useCreateChatMutation,
} = chatApi;
