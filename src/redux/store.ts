import { configureStore } from "@reduxjs/toolkit";
import bookListReducer from './bookListSlice';
import bookDetailReducer from './bookDetailSlice';

const store = configureStore({
  reducer: {
    list: bookListReducer,
    detail: bookDetailReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
