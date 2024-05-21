import { describe, expect, it, vi } from "vitest"
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactElement } from "react";
import { Provider } from "react-redux";
import axios from "axios";
import ReviewItem from "./ReviewItem";
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

describe('ReviewItem', () => {
  it('renders', () => {
    const review = 
    {
      id: 1,
      bookId: 1,
      name: "Marco Bejarano",
      date: "2024/05/18",
      content: "Excellent work, really impressed by your efforts",
    };

    renderWithProvider(<ReviewItem review={review} />);

    expect(screen.getByTestId('name').textContent).toBe('Marco Bejarano');
    expect(screen.getByTestId('review-content').textContent).toBe(
      'Excellent work, really impressed by your efforts'
    );
  });

  it('edit a review item', async () => {
    const review = {
      id: 1,
      bookId: 1,
      name: 'Marco Bejarano',
      date: '2024/05/21',
      content: 'Excellent work, really impressed by your efforts',
    };

    renderWithProvider(<ReviewItem review={ review } />);

    const button = screen.getByRole('button');
    expect(button.textContent).toBe('Edit');

    await act(async () => {
      await userEvent.click(button);
    });

    expect(button.textContent).toBe('Submit');
  });

  it('copy content to a text area for editing', async () => {
    const review = {
      id: 1,
      bookId: 1,
      name: 'Marco Bejarano',
      date: '2024/05/21',
      content: 'Excellent work, really impressed by your efforts',
    };

    renderWithProvider(<ReviewItem review={ review } />);

    const button = screen.getByRole('button');
    const content = screen.getByTestId('review-content');

    expect(content.textContent).toBeTruthy();

    await act(async () => {
      await userEvent.click(button);
    });

    const editingContent = screen.getByRole('textbox');
    const newContent = screen.queryByTestId('review-content');
    expect(newContent).toBeNull();

    expect(editingContent.textContent).toBeTruthy();
    expect(editingContent.textContent).toBe(
      'Excellent work, really impressed by your efforts'
    );
  });

  it('update the content', async () => {
    const review = {
      id: 1,
      bookId: 1,
      name: 'Marco Bejarano',
      date: '2024/05/21',
      content: 'Excellent work, really impressed by your efforts',
    };

    renderWithProvider(<ReviewItem review={ review } />);

    const putSpy = vi.spyOn(axios, 'put').mockResolvedValue({ data: review });
    const button = screen.getByRole('button');

    // Enter the editing mode
    await act(async () => {
      await userEvent.click(button);
    });

    const editingContent = screen.getByRole('textbox');
    expect(editingContent.textContent).toBeTruthy();

    await act(async () => {
      await userEvent.clear(editingContent);
      await userEvent.type(editingContent, 'I mean this is fantastic');
    });

    // Submit the form
    await act(async () => {
      await userEvent.click(button);
    });

    expect(putSpy).toHaveBeenCalledWith(
      'http://localhost:8080/books/1/reviews/1',
      { content: "I mean this is fantastic" }
    );
  });
});
