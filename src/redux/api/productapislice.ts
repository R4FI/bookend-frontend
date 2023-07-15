/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { api } from "./apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/book",
    }),
    singleBook: builder.query({
      query: (id) => `/book/${id}`,
    }),
    postReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/book/reviews/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["review"],
    }),
    getReview: builder.query({
      query: (id) => `/book/reviews/${id}`,
      providesTags: ["review"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useSingleBookQuery,
  usePostReviewMutation,
  useGetReviewQuery,
} = bookApi;
