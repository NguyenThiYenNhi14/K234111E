const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 3000;

/* ===== MIDDLEWARE ===== */
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ===== STATIC FILES ===== */
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ===== DATA ===== */
// BÀI 39
let books39 = [
  { BookId: "b1", BookName: "Kỹ thuật lập trình cơ bản", Price: 70, Image: "b1.png" },
  { BookId: "b2", BookName: "Kỹ thuật lập trình nâng cao", Price: 100, Image: "b2.png" },
  { BookId: "b3", BookName: "Máy học cơ bản", Price: 200, Image: "b3.png" },
  { BookId: "b4", BookName: "Máy học nâng cao", Price: 300, Image: "b4.png" },
  { BookId: "b5", BookName: "Lập trình Robot cơ bản", Price: 250, Image: "b5.png" }
];

// BÀI 50
let books50 = [
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

/* ===== MULTER CONFIG ===== */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

/* ===== BASIC ROUTES ===== */
app.get("/", (req, res) => {
  res.send("Unified Book API (Ex39 + Ex50)");
});

/* ===== EX 39 ROUTES ===== */
app.get("/books39", (req, res) => {
  res.json(books39);
});

app.get("/books39/:id", (req, res) => {
  const book = books39.find(b => b.BookId === req.params.id);
  res.json(book);
});

/* ===== EX 50 ROUTES ===== */
app.get("/books50", (req, res) => {
  res.json(books50);
});

app.get("/books50/:id", (req, res) => {
  const book = books50.find(b => b.id === req.params.id);
  res.json(book);
});

/* ===== COMMON ROUTE (CHO ANGULAR DÙNG CHUNG) ===== */
app.get("/books", (req, res) => {
  // trả về format BÀI 39 để Angular không vỡ
  const normalized = books50.map(b => ({
    BookId: b.id,
    BookName: b.title,
    Price: b.price,
    Image: b.image
  }));
  res.json([...books39, ...normalized]);
});

app.get("/books/:id", (req, res) => {
  let book =
    books39.find(b => b.BookId === req.params.id) ||
    books50.find(b => b.id === req.params.id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json(book);
});

/* ===== CRUD FOR EX 50 ===== */
app.post("/books", upload.single("image"), (req, res) => {
  const newBook = {
    id: req.body.id,
    title: req.body.title,
    author: req.body.author,
    price: req.body.price,
    category: req.body.category,
    image: req.file ? req.file.filename : null
  };

  books50.push(newBook);
  res.json(newBook);
});

app.put("/books/:id", upload.single("image"), (req, res) => {
  const index = books50.findIndex(b => b.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Not found" });

  books50[index] = {
    ...books50[index],
    ...req.body,
    image: req.file ? req.file.filename : books50[index].image
  };

  res.json(books50[index]);
});

app.delete("/books/:id", (req, res) => {
  books50 = books50.filter(b => b.id !== req.params.id);
  res.json({ message: "Deleted" });
});

/* ===== START SERVER ===== */
app.listen(PORT, () => {
  console.log(`Unified Book API running at http://localhost:${PORT}`);
});