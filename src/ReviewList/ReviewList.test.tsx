import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ReactElement } from "react";
import { Provider } from "react-redux";
import { Review } from "../types";
import ReviewList from "./ReviewList";
import store from "../redux/store";

const renderWithProvider = (component: ReactElement | null) => {
  return {
    ...render(
      <Provider store={ store }>
        { component }
      </Provider>
    ),
  };
};

describe('ReviewList', () => {
  it('renders an empty list', () => {
    const reviews: Review[] = [];

    renderWithProvider(<ReviewList reviews={ reviews } />);

    const reviewsContainer = screen.getByTestId("reviews-container");
    expect(reviewsContainer.children.length).toBe(0);
  });

  it('renders a list when data is passed', () => {
    const reviews = [
      {
        id: 1,
        bookId: 1,
        name: "Marco Bejarano",
        date: "2024/05/18",
        content: "Excellent work, really impressed by your efforts",
      },
      {
        id: 2,
        bookId: 1,
        name: "Juntao Qiu",
        date: "2024/05/19",
        content: "What a great book!",
      },
    ];

    renderWithProvider(<ReviewList reviews={ reviews } />);

    const items = screen.getAllByTestId('review');
    expect(items.length).toBe(2);
  });

  it('renders book review detailed information', () => {
    const reviews = [
      {
        id: 1,
        bookId: 1,
        name: 'Marco Bejarano',
        date: '2024/05/20',
        content: 'Excellent work, really impressed by your efforts',
      },
    ];

    renderWithProvider(<ReviewList reviews={ reviews } />);
    expect(screen.getByTestId('name').textContent).toBe('Marco Bejarano');
    expect(screen.getByTestId('review-content').textContent).toBe(
      'Excellent work, really impressed by your efforts'
    );
  });
});
