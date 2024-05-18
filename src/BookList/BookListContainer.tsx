import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookList from "./BookList";
import SearchBox from "./SearchBox";
import { AppDispatch } from "../redux/store";
import { fetchBooks } from "../redux/bookListSlice";
import { selectBooks } from "../redux/selectors";

const BookListContainer = () => {
  const books = useSelector(selectBooks);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchBooks(''));
  }, [dispatch]);

  return (
    <>
      <SearchBox />
      <BookList books={ books } />
    </>
  );
};

export default BookListContainer;
