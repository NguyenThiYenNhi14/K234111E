const { MongoClient } = require('mongodb');
const client = new MongoClient("mongodb://127.0.0.1:27017");

const diamondProducts = [
    {
        sku: "DP001",
        name: "Diamond Promise Ring 1/6 ct tw Round-cut 10K White Gold",
        price: 399.99,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
        qty: 1
    },
    {
        sku: "DP002",
        name: "Diamond Promise Ring 1/4 ct tw Round/Baguette 10K White Gold",
        price: 529.00,
        image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=400&fit=crop",
        qty: 1
    },
    {
        sku: "DP003",
        name: "Diamond Promise Ring 1/6 ct tw Black/White Sterling Silver",
        price: 159.00,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
        qty: 1
    },
    {
        sku: "DP004",
        name: "Diamond Promise Ring 1/5 ct tw Round-cut Sterling Silver",
        price: 289.00,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&h=400&fit=crop",
        qty: 1
    },
    {
        sku: "DP005",
        name: "Diamond Promise Ring 1/5 ct tw Round-cut Sterling Silver Ring",
        price: 289.00,
        image: "https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=400&h=400&fit=crop",
        qty: 1
    },
    {
        sku: "DP006",
        name: "Diamond Promise Ring 1/8 ct tw Round-cut Sterling Silver Ring",
        price: 229.00,
        image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop",
        qty: 1
    }
];

async function seed() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");
        const db = client.db("Fashion_store_db");
        const collection = db.collection("diamond_products");
        await collection.deleteMany({});
        console.log("Cleared existing diamond_products.");
        const result = await collection.insertMany(diamondProducts);
        console.log(`Inserted ${result.insertedCount} products successfully!`);
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.close();
        console.log("Done.");
    }
}
seed();