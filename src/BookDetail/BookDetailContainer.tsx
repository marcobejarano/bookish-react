import BookDetail from "./BookDetail";
import useBook from "../hooks/useBook";

const BookDetailContainer = () => {
  const { book } = useBook();

  return <BookDetail book={ book } />;
};

export default BookDetailContainer;
