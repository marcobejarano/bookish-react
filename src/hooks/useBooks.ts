import axios from "axios";
import { useState, useEffect } from "react";
import type { Book } from "../types";

const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(false);

      try {
        const response = await axios.get('http://localhost:8080/books');
        setBooks(response.data);
      } catch(e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return {
    loading,
    error,
    books
  };
};

export default useBooks;
