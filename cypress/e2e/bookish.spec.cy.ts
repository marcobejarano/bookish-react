import {
  fetchBooks,
  goToApp,
  checkAppTitle,
  checkBookListWith,
  goToNthBookInTheList,
  checkBookDetail,
  performSearch,
  composeReview,
  checkReview,
} from './helpers';

before(() => {
  fetchBooks();
});

beforeEach(() => {
  goToApp();
});

afterEach(() => {
  cy.request('DELETE', 'http://localhost:8080/books/1/reviews');
});

describe('Bookish application', () => {
  it('Visits the bookish', () => {
    checkAppTitle('Bookish');
  });

  it('Shows a booklist', () => {
    checkAppTitle('Bookish');
    checkBookListWith([
      'Refactoring',
      'Domain-driven design',
      'Building Microservices',
      'Acceptance Test Driven Development with React',
    ]);
  });

  it('Goes to the detail page', () => {
    goToNthBookInTheList(0);
    checkBookDetail('Refactoring');
  });

  it('Searches for a title', () => {
    performSearch('design');
    checkBookListWith(['Domain-driven design']);
  });

  it('Write a review for a book', () => {
    goToNthBookInTheList(0);
    checkBookDetail('Refactoring');
    composeReview('Marco Bejarano', 'Excellent work!');
    checkReview();
  });
});
