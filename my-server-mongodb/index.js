const express = require('express');
const app = express();
const port = 3002;

const morgan = require("morgan");
app.use(morgan("combined"));

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors({ origin: true, credentials: true }));

// ===== SESSION (BÀI 62 & 63) =====
var session = require('express-session');
app.use(session({
    secret: "Shh, its a secret!",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 giờ
}));

// ===== STATIC FILES =====
app.use(express.static("public"));

app.listen(port, () => {
    console.log(`My Server listening on port ${port}`)
});

app.get("/", (req, res) => {
    res.send("Server is running!")
});

// ===== KẾT NỐI MONGODB =====
const { MongoClient, ObjectId } = require('mongodb');
const client = new MongoClient("mongodb://127.0.0.1:27017");
client.connect();
const database = client.db("Fashion_store_db");
const fashionCollection = database.collection("fashion");
const userCollection = database.collection("user");
const productCollection = database.collection("product");

// ===== JWT =====
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "fashion_secret_key_2024";

function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ message: "Không có token!" });
    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token không hợp lệ!" });
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Token hết hạn hoặc sai!" });
        req.user = decoded;
        next();
    });
}

// ===== AUTH ROUTES =====
app.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password)
            return res.status(400).json({ message: "Thiếu username hoặc password!" });
        const existing = await userCollection.findOne({ username });
        if (existing)
            return res.status(409).json({ message: "Username đã tồn tại!" });
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await userCollection.insertOne({ username, password: hashedPassword, createdAt: new Date() });
        res.status(201).json({ message: "Đăng ký thành công!", userId: result.insertedId });
    } catch (err) {
        res.status(500).json({ message: "Lỗi server!", error: err.message });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password)
            return res.status(400).json({ message: "Thiếu username hoặc password!" });
        const user = await userCollection.findOne({ username });
        if (!user)
            return res.status(401).json({ message: "Sai username hoặc password!" });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ message: "Sai username hoặc password!" });
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.status(200).json({ message: "Đăng nhập thành công!", token, username: user.username });
    } catch (err) {
        res.status(500).json({ message: "Lỗi server!", error: err.message });
    }
});

// ===== FASHION ROUTES =====
app.get("/fashions", cors(), verifyToken, async (req, res) => {
    const result = await fashionCollection.find({}).toArray();
    res.send(result);
});

app.get("/fashions/:id", cors(), verifyToken, async (req, res) => {
    try {
        const o_id = new ObjectId(req.params["id"]);
        const result = await fashionCollection.find({ _id: o_id }).toArray();
        res.send(result[0]);
    } catch (err) {
        res.status(400).json({ message: "ID không hợp lệ!" });
    }
});

// ============================================================
// ===== BÀI 62: SESSION DEMO =====
// ============================================================
app.get("/contact", cors(), (req, res) => {
    if (req.session.visited != null) {
        req.session.visited++;
        res.send("You visited this page " + req.session.visited + " times");
    } else {
        req.session.visited = 1;
        res.send("Welcome to this page for the first time!");
    }
});

// ============================================================
// ===== BÀI 63: SHOPPING CART (SESSION) =====
// ============================================================

// Lấy danh sách tất cả Product từ MongoDB
app.get("/products", cors(), async (req, res) => {
    try {
        const result = await productCollection.find({}).toArray();
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: "Lỗi server!", error: err.message });
    }
});

// Thêm sản phẩm vào giỏ hàng (session)
app.post("/cart/add", cors(), async (req, res) => {
    try {
        const { productId } = req.body;
        const o_id = new ObjectId(productId);
        const product = await productCollection.findOne({ _id: o_id });
        if (!product)
            return res.status(404).json({ message: "Sản phẩm không tồn tại!" });

        // Khởi tạo cart nếu chưa có
        if (!req.session.cart) {
            req.session.cart = [];
        }

        // Kiểm tra sản phẩm đã có trong giỏ chưa
        const existIndex = req.session.cart.findIndex(
            item => item._id.toString() === productId
        );

        if (existIndex >= 0) {
            // Đã có → tăng số lượng
            req.session.cart[existIndex].quantity += 1;
        } else {
            // Chưa có → thêm mới với quantity = 1
            req.session.cart.push({ ...product, quantity: 1 });
        }

        res.json({ message: "Đã thêm vào giỏ hàng!", cart: req.session.cart });
    } catch (err) {
        res.status(500).json({ message: "Lỗi server!", error: err.message });
    }
});

// Xem giỏ hàng
app.get("/cart", cors(), (req, res) => {
    const cart = req.session.cart || [];
    res.json(cart);
});

// Cập nhật giỏ hàng (xóa checked + cập nhật số lượng)
app.post("/cart/update", cors(), (req, res) => {
    try {
        const { updates, removeIds } = req.body;
        // updates: [{ id, quantity }]
        // removeIds: ["id1", "id2", ...]

        if (!req.session.cart) req.session.cart = [];

        // Xóa các sản phẩm được check remove
        if (removeIds && removeIds.length > 0) {
            req.session.cart = req.session.cart.filter(
                item => !removeIds.includes(item._id.toString())
            );
        }

        // Cập nhật số lượng
        if (updates && updates.length > 0) {
            updates.forEach(update => {
                const index = req.session.cart.findIndex(
                    item => item._id.toString() === update.id
                );
                if (index >= 0) {
                    req.session.cart[index].quantity = parseInt(update.quantity) || 1;
                }
            });
        }

        res.json({ message: "Đã cập nhật giỏ hàng!", cart: req.session.cart });
    } catch (err) {
        res.status(500).json({ message: "Lỗi!", error: err.message });
    }
});

// Xóa toàn bộ giỏ hàng
app.delete("/cart/clear", cors(), (req, res) => {
    req.session.cart = [];
    res.json({ message: "Đã xóa toàn bộ giỏ hàng!" });
});