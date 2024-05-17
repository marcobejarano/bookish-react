import axios from "axios";

before(async () => {
  try {
    const response = await axios.get('http://localhost:8080/books');
    const books = response.data;
    return books;
  } catch(error) {
    throw new Error(`Failed to fetch books: ${ error.message }`)
  }
});

describe('Bookish application', () => {
  it('Visits the bookish', () => {
    cy.visit('/', { timeout: 120000 });

    cy.get('h2[data-test="heading"]').contains('Bookish');
  });

  it('Shows a booklist', () => {
    cy.visit('/', { timeout: 120000 });

    cy.get('div[data-test="book-list"]').should('exist');
    cy.get('div.book-item').should((books) => {
      expect(books).to.have.length(4);

      const titles = [...books].map(x => x.querySelector('h2').innerHTML);
      expect(titles).to.deep.equal(
        [
          'Refactoring',
          'Domain-driven design',
          'Building Microservices',
          'Acceptance Test Driven Development with React'
        ]
      );
    });
  });

  it('Goes to the detail page', () => {
    cy.visit('/', { timeout: 120000 });

    cy.get('div.book-item').contains('View Details').eq(0).click();
    cy.url().should('include', '/books/1');
    cy.get('h2.book-title').contains('Refactoring')
  });
});
