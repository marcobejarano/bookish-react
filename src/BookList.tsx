import type { Book } from './types';

const BookList = ({ books }: { books: Book[] }) => {
  return (
    <div data-test="book-list">
      { books.map((book, index) => (
        <div key={ index } className='book-item'>
          <h2 className='title'>{ book.name }</h2>
        </div>
      )) }
    </div>
  );
};

export default BookList;
