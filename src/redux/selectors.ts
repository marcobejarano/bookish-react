import { createSelector } from "reselect";
import { RootState } from "./store";

const selectBooksState = (state: RootState) => state.list;

export const selectBooks = createSelector(
  [selectBooksState],
  (list) => list.books
);
