const express = require("express");
const port = 3000;
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

let books = [
  {
    isbn: "123456789875",
    title: "Sample Book 1",
    author: "John",
    reviews: "Nice book",
  },
  {
    isbn: "1234567892345",
    title: "The Sun",
    author: "kamla",
    reviews: "Amazing",
    price: 19,
  },
  {
    isbn: "123453766789",
    title: "Heaven",
    author: "Mira",
    reviews: "Marvellous",
    price: 95,
  },
  {
    isbn: "134523456789",
    title: "Durga",
    author: "Jaya",
    reviews: "Thrilling",
    price: 15,
  },
];

// Task 1: Get the book list
app.get("/books", (req, res) => {
  res.json(books);
});

// Task 2: Get books based on ISBN
app.get("/books/isbn/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const book = books.find((book) => book.isbn === isbn);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// Task 3: Get all books by Author
app.get("/books/author/:author", (req, res) => {
  const author = req.params.author;
  const authorBooks = books.filter((book) => book.author === author);
  res.json(authorBooks);
});

//Task 4: Get all books based on Title
app.get("/books/title/:title", (req, res) => {
  const title = req.params.title;
  const titleBooks = books.filter((book) => book.title === title);
  res.json(titleBooks);
});

//Task 5: Get book review
app.get("/books/reviews/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const book = books.find((book) => book.isbn === isbn);
  if (book) {
    res.json(book.reviews);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

//Task 6: Register new user
let users = [];

app.post("/users/register", (req, res) => {
  const { username, password } = req.body;
  const newUser = { username, password };
  users.push(newUser);
  res.json({ message: "User registered successfully", user: newUser });
});

//Task 7: Login as a registered user
app.post("/users/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    res.json({ message: "Login successful", user });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});
//Task 8. Add/Modify a book review.
app.put("/books/:isbn/reviews", (req, res) => {
  const { isbn } = req.params;
  const { review } = req.body;
  const book = books.find((b) => b.isbn === isbn);
  if (!book) {
    return res.status(404).send("Book not found");
  }
  book.review = review;
  res.send("Review added/modified successfully");
});

// Task 9: Delete book review added by that particular user
app.delete("/books/:isbn/reviews", (req, res) => {
  const { isbn } = req.params;
  const bookIndex = books.findIndex((b) => b.isbn === isbn);

  if (bookIndex === -1) {
    return res.status(404).send("Book not found");
  }

  if (!books[bookIndex].reviews) {
    return res.status(404).send("No review found for this book");
  }

  delete books[bookIndex].reviews;
  res.send("Review deleted successfully");
});

//Node.js
//Task 10: Get all books using an async callback function
const getAllBooks = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(books);
    }, 1000);
  });
};

app.get("/books/all", async (req, res) => {
  try {
    const allBooks = await getAllBooks();
    res.json(allBooks);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//Task 11: Search by ISBN using Promises
const searchByISBN = (isbn) => {
  return new Promise((resolve, reject) => {
    const book = books.find((book) => book.isbn === isbn);
    if (book) {
      resolve(book);
    } else {
      reject({ message: "Book not found" });
    }
  });
};

//Task 12: Search by Author
app.get("/books/search/author/:author", (req, res) => {
  const author = req.params.author;
  const authorBooks = books.filter((book) => book.author === author);
  res.json(authorBooks);
});

//Task 13: Search by Title
app.get("/books/search/title/:title", (req, res) => {
  const title = req.params.title;
  const titleBooks = books.filter((book) => book.title === title);
  res.json(titleBooks);
});

app.get("/books/search/isbn/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  searchByISBN(isbn)
    .then((book) => res.json(book))
    .catch((error) => res.status(404).json(error));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

