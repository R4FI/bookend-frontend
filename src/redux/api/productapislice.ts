/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
    postBook: builder.mutation({
      query: (data) => ({
        url: `/book/`,
        method: "POST",
        body: data,
      }),
    }),
    updateBook: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/book/${id}`,
        method: "PUT",
        body: { ...formData },
      }),
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/book/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  useSingleBookQuery,
  usePostReviewMutation,
  useGetReviewQuery,
  usePostBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;
