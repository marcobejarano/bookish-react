import { createSelector } from "reselect";
import { RootState } from "./store";

const selectBooksState = (state: RootState) => state.list;
const selectBookState = (state: RootState) => state.detail;

export const selectBooks = createSelector(
  [selectBooksState],
  (list) => list.books
);

export const selectBook = createSelector(
  [selectBookState],
  (detail) => detail.book
);
