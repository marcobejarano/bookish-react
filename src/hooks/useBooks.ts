import axios from "axios";
import { useState, useEffect } from "react";
import type { Book } from "../types";

const useBooks = () => {
  const [term, setTerm] = useState<string>('');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchBooks = async (term: string) => {
      setError(false);
      setLoading(true);

      try {
        const response = await axios.get(
          `http://localhost:8080/books?q=${ term }&_sort=id`
        );
        setBooks(response.data);
      } catch(e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks(term);
  }, [term]);

  return {
    loading,
    error,
    books,
    term,
    setTerm
  };
};

export default useBooks;
