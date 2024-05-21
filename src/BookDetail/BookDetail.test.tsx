import { describe, it, expect} from 'vitest';
import { render, screen } from "@testing-library/react";
import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import BookDetail from './BookDetail';
import store from '../redux/store';

describe('BookDetail', () => {
  const renderWithProvider = (component: ReactElement | null) => {
    return {
      ...render(
        <Provider store={ store }>
          { component }
        </Provider>
      )
    }
  };

  it('renders title', () => {
    const props = {
      book: {
        id: 1,
        name: 'Refactoring',
      },
    };

    renderWithProvider(<BookDetail {...props} />);

    const title = screen.getByRole('heading');
    expect(title.textContent).toEqual(props.book.name);
  });

  it('renders description', () => {
    const props = {
      book: {
        id: 1,
        name: 'Refactoring',
        description:
          "Martin Fowler's Refactoring defined core ideas and techniques " +
          "that hundreds of thousands of developers have used to improve " +
          "their software.",
      },
    };

    renderWithProvider(<BookDetail { ...props } />);

    const description = screen.getByText(props.book.description);
    expect(description.textContent).toBeTruthy();
  });

  it('displays the book name when no description was given', () => {
    const props = {
      book: {
        id: 1,
        name: 'Refactoring',
      },
    };

    renderWithProvider(<BookDetail { ...props } />);

    const description = screen.getByTestId('book-description');
    expect(description.textContent).toEqual(props.book.name);
  });

  it('renders views', () => {
    const props = {
      book: {
        id: 1,
        name: 'Refactoring',
        description:
          "Martin Fowler's Refactoring defined core ideas and techniques...",
        reviews: [
          {
            id: 1,
            bookId: 1,
            name: "Marco Bejarano",
            date: "2024/05/18",
            content: "Excellent work, really impressed by your efforts",
          },
        ],
      },
    };

    renderWithProvider(<BookDetail { ...props } />);

    const reviews = screen.getAllByTestId('review');
    expect(reviews.length).toBe(1);
  });

  it('renders view form', () => {
    const props = {
      book: {
        id: 1,
        name: 'Refactoring',
        description:
          "Martin Fowler's Refactoring defined core ideas and techniques...",
      },
    };

    renderWithProvider(<BookDetail { ...props } />)

    const nameInput = screen.getByTestId('name');
    const contentInput = screen.getByTestId('content');
    const button = screen.getByTestId('submit');
    expect(nameInput.textContent).toBeTruthy();
    expect(contentInput.textContent).toBeTruthy();
    expect(button.textContent).toBeTruthy();
  });
});
