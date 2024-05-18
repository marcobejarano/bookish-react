import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Book } from "../types";

export const fetchBookDetail = createAsyncThunk<Book, string>(
  'bookDetail/fetch',
  async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/books/${ id }`
      );
      return response.data;
    } catch(error) {
      throw new Error(`An error ocurred when trying to fetch the book: ${ error }`);
    }
  }
);

type BookDetailType = {
  book: Book;
  loading: boolean;
  error: boolean;
}

const initialState: BookDetailType = {
  book: {
    id: 0,
    name: '',
  },
  loading: false,
  error: false,
};

const bookDetailSlice = createSlice({
  name: 'bookDetail',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookDetail.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchBookDetail.fulfilled, (state, action) => {
        state.book = action.payload;
        state.loading = false;
      })
      .addCase(fetchBookDetail.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default bookDetailSlice.reducer;
