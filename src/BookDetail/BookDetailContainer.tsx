import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchBookDetail } from "../redux/bookDetailSlice";
import BookDetail from "./BookDetail";

const BookDetailContainer = () => {
  const { id = '' } = useParams<string>();
  const { book } = useSelector((state: RootState) => ({
    book: state.detail.book
  }));
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchBookDetail(id));
  }, [dispatch]);

  return <BookDetail book={ book } />;
};

export default BookDetailContainer;
