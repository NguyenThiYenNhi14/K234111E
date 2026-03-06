const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

/* ===== MIDDLEWARE ===== */
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ===== STATIC FILES ===== */
app.use("/images",  express.static(path.join(__dirname, "public/images")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ===== ENSURE UPLOADS FOLDER EXISTS ===== */
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

/* ===== DATA FILE FOR EX50 (persistent) ===== */
const DATA_FILE = path.join(__dirname, "books50.json");
function readBooks50() {
  if (!fs.existsSync(DATA_FILE)) {
    const defaultData = [
      { id: "b1", title: "Clean Code", author: "Robert C. Martin", price: 120, category: "Programming", image: "b1.png", createdAt: new Date().toISOString() },
      { id: "b2", title: "You Don't Know JS", author: "Kyle Simpson", price: 95, category: "Programming", image: "b2.jpg", createdAt: new Date().toISOString() }
    ];
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2));
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}
function writeBooks50(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

/* ===== DATA FOR EX39 (in-memory) ===== */
let books39 = [
  { BookId: "b1", BookName: "Kỹ thuật lập trình cơ bản",  Price: 70,  Image: "b1.png" },
  { BookId: "b2", BookName: "Kỹ thuật lập trình nâng cao", Price: 100, Image: "b2.png" },
  { BookId: "b3", BookName: "Máy học cơ bản",              Price: 200, Image: "b3.png" },
  { BookId: "b4", BookName: "Máy học nâng cao",            Price: 300, Image: "b4.png" },
  { BookId: "b5", BookName: "Lập trình Robot cơ bản",      Price: 250, Image: "b5.png" }
];

/* ===== MULTER CONFIG ===== */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename:    (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

/* ===== BASIC ROUTE ===== */
app.get("/", (req, res) => {
  res.send("Unified Book API (Ex39 + Ex50)");
});

/* ===== EX39 ROUTES ===== */
app.get("/books39", (req, res) => res.json(books39));

app.get("/books39/:id", (req, res) => {
  const book = books39.find(b => b.BookId === req.params.id);
  book ? res.json(book) : res.status(404).json({ message: "Not found" });
});

/* ===== EX50 ROUTES ===== */
app.get("/books50", (req, res) => res.json(readBooks50()));

app.get("/books50/:id", (req, res) => {
  const book = readBooks50().find(b => b.id === req.params.id);
  book ? res.json(book) : res.status(404).json({ message: "Not found" });
});

/* ===== /books ROUTES (used by Angular Ex50) ===== */
app.get("/books", (req, res) => {
  res.json(readBooks50());
});

app.get("/books/:id", (req, res) => {
  const book = readBooks50().find(b => b.id === req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
});

// POST — create new book (FormData with optional image)
app.post("/books", upload.single("image"), (req, res) => {
  const books = readBooks50();
  const newBook = {
    id:        req.body.id,
    title:     req.body.title,
    author:    req.body.author   || "",
    price:     parseFloat(req.body.price) || 0,
    category:  req.body.category || "",
    image:     req.file ? req.file.filename : "",
    createdAt: new Date().toISOString()
  };
  books.push(newBook);
  writeBooks50(books);
  res.status(201).json(newBook);
});

// PUT — update book (FormData with optional new image)
app.put("/books/:id", upload.single("image"), (req, res) => {
  const books = readBooks50();
  const index = books.findIndex(b => b.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Not found" });

  books[index] = {
    ...books[index],
    title:    req.body.title    || books[index].title,
    author:   req.body.author   || books[index].author,
    price:    parseFloat(req.body.price) || books[index].price,
    category: req.body.category || books[index].category,
    image:    req.file ? req.file.filename : books[index].image
  };

  writeBooks50(books);
  res.json(books[index]);
});

// DELETE — delete book
app.delete("/books/:id", (req, res) => {
  const books = readBooks50().filter(b => b.id !== req.params.id);
  writeBooks50(books);
  res.json({ message: "Deleted successfully" });
});

/* ===== START ===== */
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});