import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { Book } from "../types";
import { useDispatch } from "react-redux";
import { addReview } from "../redux/reviewSlice";
import { fetchBookDetail } from "../redux/bookDetailSlice";
import { AppDispatch } from "../redux/store";

const ReviewForm = ({ book }: { book: Book }) => {
  const [name, setName] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = () => {
    dispatch(addReview({ id: book.id, name, content }));
    setTimeout(() => {
      dispatch(fetchBookDetail(book.id.toString()));
    }, 0);
    setName('');
    setContent('');
  };

  return (
    <form noValidate autoComplete="off">
      <TextField
        data-testid='name'
        label='Name'
        name='name'
        margin='normal'
        variant='outlined'
        value={ name }
        onChange={ (e) => setName(e.target.value) }
      />
      <TextField
        data-testid='content'
        label='Content'
        name='content'
        margin='normal'
        variant='outlined'
        multiline
        value={ content }
        onChange={ (e) => setContent(e.target.value) }
      />
      <Button
        data-testid='submit'
        variant='contained'
        color='primary'
        name='submit'
        onClick={ handleSubmit }
      >
        Submit
      </Button>
    </form>
  );
};

export default ReviewForm;
