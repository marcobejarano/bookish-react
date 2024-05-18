import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { fetchBooks, setTerm } from "../redux/bookListSlice";

const SearchBox = () => {
  const dispatch = useDispatch<AppDispatch>();

  const performSearch = (event: any) => {
    const value = event.target.value;
  
    if (value && value.trim().length === 0) {
      return;
    }
  
    dispatch(setTerm(value));
    dispatch(fetchBooks(value));
  }
  return (
    <TextField
      label='Search'
      data-test='search'
      onChange={ performSearch }
      margin='normal'
      variant='outlined'
    />
  );
};

export default SearchBox;
