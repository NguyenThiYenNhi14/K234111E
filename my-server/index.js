const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let books = [
  {
    id: "b1",
    title: "Clean Code",
    author: "Robert C. Martin",
    price: 120,
    category: "Programming",
    image: "b1.png"
  },
  {
    id: "b2",
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    price: 95,
    category: "Programming",
    image: "b2.jpg"
  }
];

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    }
  })
});

// GET ALL BOOKS
app.get("/books", (req, res) => {
  res.json(books);
});

// GET BOOK BY ID
app.get("/books/:id", (req, res) => {
  const book = books.find(b => b.id === req.params.id);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.json(book);
});

// CREATE NEW BOOK
app.post("/books", (req, res) => {
  const newBook = req.body;

  if (!newBook.id || !newBook.title) {
    return res.status(400).json({ message: "Invalid book data" });
  }

  books.push(newBook);
  res.json({
    message: "Book added successfully",
    book: newBook
  });
});

// UPDATE BOOK
app.put("/books/:id", upload.single("image"), (req, res) => {
  const id = req.params.id;
  const index = books.findIndex(b => b.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  const updatedData = {
    ...req.body
  };

  if (req.file) {
    updatedData.image = req.file.filename;
  }

  books[index] = {
    ...books[index],
    ...updatedData,
    id
  };

  res.json(books[index]);
});


// DELETE BOOK
app.delete("/books/:id", (req, res) => {
  const id = req.params.id;
  books = books.filter(b => b.id !== id);
  res.json({ message: "Book deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Book API is running at http://localhost:${PORT}`);
});
