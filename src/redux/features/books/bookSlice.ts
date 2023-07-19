/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type IBooks = {
  id?: string | null;
  title: string | null;
  author: string | null;
  genre: string | null;
  publicationDate: string | null;
  userEmail?: string | null;
};
interface BookState {
  books: IBooks[];
}

const initialState: BookState = {
  books: [],
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<IBooks>) => {
      state.books.push(action.payload);
    },
    updateBook: (state, action: PayloadAction<IBooks>) => {
      const { id, title, author, genre, publicationDate } = action.payload;
      const existingBook = state.books.find((book) => book.id === id);
      if (existingBook) {
        existingBook.title = title;
        existingBook.author = author;
        existingBook.genre = genre;
        existingBook.publicationDate = publicationDate;
      }
    },
  },
});

export const { addBook, updateBook } = bookSlice.actions;

export default bookSlice.reducer;
