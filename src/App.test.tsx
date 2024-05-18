import { ReactElement } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { MemoryRouter } from "react-router";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

const customRender = (component: ReactElement) => {
  return {
    ...render(
      <Provider store={ store }>
        <MemoryRouter>
          { component }
        </MemoryRouter>
      </Provider>
    )
  };
};

describe('App.tsx', () => {
  it('renders bookish', () => {
    customRender(<App />);
    const heading = screen.getByText(/Bookish/i);
    expect(heading.textContent).toBeTruthy();
  });
});
