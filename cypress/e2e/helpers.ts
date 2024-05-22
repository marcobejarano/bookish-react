import axios from "axios";

export const fetchBooks = async () => {
  try {
    const response = await axios.get('http://localhost:8080/books');
    const books = response.data;
    return books;
  } catch(error) {
    throw new Error(`Failed to fetch books: ${ error.message }`)
  }
};

export const goToApp = () => {
  cy.visit('/', { timeout: 120000 });
};

export const deleteReviewsFromFirstBook = () => {
  cy.request('DELETE', 'http://localhost:8080/books/1/reviews');
};

export const checkAppTitle = (title: string) => {
  cy.get('h2[data-test="heading"]').contains(title);
};

export const checkBookListWith = (expectation: string[] = []) => {
  cy.get('div[data-test="book-list"]').should('exist');
  cy.get('div.book-item').should((books) => {
    expect(books).to.have.length(expectation.length);

    const titles = [...books].map(x => x.querySelector('h2')?.innerHTML);
    expect(titles).to.deep.equal(expectation);
  });
};

export const goToNthBookInTheList = (index: number) => {
  cy.get('div.book-item').contains('View Details').eq(index).click();
};

export const checkBookDetail = (content: string = '') => {
  cy.url().should('include', '/books/1');
  cy.get('.book-title').contains(content);
};

export const performSearch = (term: string) => {
  cy.get('[data-test="search"] input').type(term);
};

export const composeReview = (name: string, content: string) => {
  cy.get('input[name="name"]').type('Marco Bejarano');
  cy.get('textarea[name="content"]').type('Excellent work!');
  cy.get('button[name="submit"]').click();
};

export const checkReview = (content: string) => {
  cy.get('div[data-testid="reviews-container"]')
    .find('div[data-testid="review"]')
    .should('have.length', 1);
};
