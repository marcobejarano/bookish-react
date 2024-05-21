import { configureStore } from "@reduxjs/toolkit";
import bookListReducer from './bookListSlice';
import bookDetailReducer from './bookDetailSlice';
import reviewReducer from './reviewSlice';

const store = configureStore({
  reducer: {
    list: bookListReducer,
    detail: bookDetailReducer,
    reviewReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
