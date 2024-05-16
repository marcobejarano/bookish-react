import Typography from '@mui/material/Typography';
import BookListContainer from './BookListContainer';

const App = () => {
  return (
    <>
      <Typography variant='h2' component='h2' data-test='heading'>
        Bookish
      </Typography>
      <BookListContainer />
    </>
  );
};

export default App;
