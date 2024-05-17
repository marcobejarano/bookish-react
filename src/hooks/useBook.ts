import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router"
import { Book } from "../types";

const useBook = () => {
  const { id } = useParams<string>();
  const [book, setBook] = useState<Book>({ id: 0, name: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/books/${ id }`
        );
        setBook(response.data);
      } catch(e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  return {
    book,
    loading,
    error,
  };
};

export default useBook;
