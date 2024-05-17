import {
  fetchBooks,
  goToApp,
  checkAppTitle,
  checkBookListWith,
  goToNthBookInTheList,
  checkBookDetail,
  performSearch,
} from './helpers';

before(() => {
  fetchBooks();
});

beforeEach(() => {
  goToApp();
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
});
