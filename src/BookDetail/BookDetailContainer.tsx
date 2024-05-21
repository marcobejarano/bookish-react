import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { fetchBookDetail } from "../redux/bookDetailSlice";
import BookDetail from "./BookDetail";
import { selectBook } from "../redux/selectors";

const BookDetailContainer = () => {
  const { id = '' } = useParams<string>();
  const book = useSelector(selectBook);
  
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchBookDetail(id));
  }, [dispatch]);

  return <BookDetail book={ book } />;
};

export default BookDetailContainer;
