import { describe, it, expect } from "vitest";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import SearchBox from "./SearchBox";
import bookListReducer from '../redux/bookListSlice';

describe('SearchBox', () => {
  it('renders input', async () => {
    const mockStore = configureStore({
      reducer: {
        list: bookListReducer,
      },
    });

    render(
      <Provider store={ mockStore }>
        <SearchBox />
      </Provider>
    );

    const input = screen.getByRole('textbox');

    await act(async () => {
      await userEvent.type(input, 'domain');
    });
    
    const state = mockStore.getState();
    expect(state.list.term).toEqual('domain');
  });

  it('trim empty strings', async () => {
    const mockStore = configureStore({
      reducer: {
        list: bookListReducer,
      },
    });

    render(
      <Provider store={ mockStore }>
        <SearchBox />
      </Provider>
    );

    const input = screen.getByRole('textbox');

    await act(async() => {
      await userEvent.type(input, '  ');
    });

    const state = mockStore.getState();
    expect(state.list.term).toEqual('');
  });
});
