import useBooks from "./useBooks";
import BookList from "./BookList";

const BookListContainer = () => {
  const { loading, error, books } = useBooks();

  // if (loading) {
  //   return <p>Loading...</p>
  // }

  // if (error) {
  //   return <p>Error...</p>
  // }
  
  return <BookList books={ books } />;
};

export default BookListContainer;
