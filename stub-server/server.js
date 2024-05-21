import jsonServer from 'json-server';
import bodyParser from 'body-parser';
import cors from 'cors';

const server = jsonServer.create()
const router = jsonServer.router('stub-server/db.json')
const middlewares = jsonServer.defaults()

// Use body-parser middleware before defining routes
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS for all routes
server.use(cors());

// Define custom routes before the default router
server.post('/books/:id/reviews', (req, res) => {
  const { id } = req.params;
  const { name, content } = req.body;

  const book = router.db.get('books').find({
    id: parseInt(id)
  }).value();

  if (book) {
    if (!book.reviews) {
      book.reviews = [];
    }

    const review = {
      id: book.reviews.length + 1,
      bookId: parseInt(id),
      name,
      content,
    };

    book.reviews.push(review);
    router.db.write();

    res.status(201).json(review);
  } else {
    res.status(404).json({ error: 'Book not found' })
  }
});

server.delete('/books/:id/reviews', (req, res) => {
  const { id } = req.params;

  const book = router.db.get('books').find({
    id: parseInt(id)
  }).value();
  book.reviews = [];
  router.db.write();

  res.sendStatus(204);
});

// Middleware to handle DELETE requests with _cleanup query
server.use((req, res, next) => {
  if (req.method === 'DELETE' && req.query['_cleanup']) {
    const db = router.db;
    db.set('books', []).write();
    res.sendStatus(204);
  } else {
    next();
  }
});

// Use default middlewares and router
server.use(middlewares);
server.use(router);

server.listen(8080, () => {
  console.log('JSON Server is running')
});
