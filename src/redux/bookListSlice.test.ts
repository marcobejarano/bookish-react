import { describe, expect, it } from "vitest";
import bookListReducer, { setTerm } from "./bookListSlice";

describe('bookListReducer', () => {
  const initialState = {
    term: '',
    books: [],
    loading: false,
    error: false,
  };

  it('should handle setTerm action', () => {
    const action = setTerm('Refactoring');
    const newState = bookListReducer(initialState, action);

    expect(newState.term).toEqual('Refactoring');
  });
});
