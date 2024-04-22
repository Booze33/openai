import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: 'main',
  endpoints: () => ({}),
  tagTypes: [],
  endPoints: (build) => ({
    postAiText: build.mutation({
      query: (payload) => ({
        url: "openai/text",
        method: "POST",
      }),
    }),
    postAiCode: build.mutation({
      query: (payload) => ({
        url: "openai/code",
        method: "POST",
      }),
    }),
    postAiAssist: build.mutation({
      query: (payload) => ({
        url: "openai/code",
        method: "POST",
      }),
    }),
  }),
});

export const {
  usePostAiTextMutation,
  usePostAiCodeMutation,
  usePostAiAssistMutation
} = api;