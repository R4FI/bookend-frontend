/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bookbackend-77zi8soyy-r4fi.vercel.app/api/v1",
  }),
  tagTypes: ["review"],
  endpoints: (_builder) => ({}),
});

export default api;
