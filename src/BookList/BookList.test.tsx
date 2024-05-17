import { describe, it, expect } from 'vitest';
import {render, screen } from '@testing-library/react';
import { ReactElement } from 'react';
import { MemoryRouter } from 'react-router';
import BookList from './BookList';

const renderWithRouter = (component: ReactElement | null) => {
  return {
    ...render(<MemoryRouter>{ component }</MemoryRouter>),
  }
}

describe('BookList', () => {
  it('render books', async () => {
    const props = {
      books: [
        { 'name': 'Refactoring', 'id': 1 },
        { 'name': 'Domain-driven design', 'id': 2 },
      ]
    };

    renderWithRouter(<BookList {...props} />);

    const headings = await screen.findAllByRole('heading');
    headings.forEach((heading, index) => {
      expect(heading.textContent).toBe(props.books[index].name);
    });
  });
});
