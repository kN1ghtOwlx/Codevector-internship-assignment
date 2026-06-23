const mongoose = require("mongoose");
require("dotenv").config();

const TOTAL_PRODUCTS = 200000;
const BATCH_SIZE = 5000;

const CATEGORIES = [
  "electronics",
  "fashion",
  "home",
  "books",
  "sports",
  "beauty",
  "toys",
  "grocery",
  "automotive",
  "stationery",
];

const ADJECTIVES = [
  "Alpha",
  "Prime",
  "Swift",
  "Nova",
  "Urban",
  "Smart",
  "Ultra",
  "Neo",
  "Daily",
  "Fresh",
  "Bold",
  "Rapid",
  "Elite",
  "Magic",
  "Classic",
];

const NOUNS = [
  "Phone",
  "Laptop",
  "Bottle",
  "Watch",
  "Bag",
  "Lamp",
  "Chair",
  "Book",
  "Shoes",
  "Tablet",
  "Headphones",
  "Shirt",
  "Mouse",
  "Keyboard",
];

const productSchema = new mongoose.Schema(
  {
    name: String,
    category: String,
    price: Number,
    created_at: Date,
    updated_at: Date,
  },
  {
    versionKey: false,
  }
);

const Product = mongoose.model("Product", productSchema);

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateProduct() {
  const now = new Date();

  const createdAt = new Date(
    now.getTime() -
      Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)
  );

  let updatedAt = new Date(
    createdAt.getTime() +
      Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
  );

  if (updatedAt > now) {
    updatedAt = now;
  }

  return {
    name: `${randomItem(ADJECTIVES)} ${randomItem(NOUNS)} ${Math.floor(
      1000 + Math.random() * 9000
    )}`,
    category: randomItem(CATEGORIES),
    price: Number((49 + Math.random() * 49950).toFixed(2)),
    created_at: createdAt,
    updated_at: updatedAt,
  };
}

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB Connected");

    await Product.deleteMany({});
    console.log("Existing products deleted");

    let inserted = 0;

    while (inserted < TOTAL_PRODUCTS) {
      const batch = [];

      const size = Math.min(
        BATCH_SIZE,
        TOTAL_PRODUCTS - inserted
      );

      for (let i = 0; i < size; i++) {
        batch.push(generateProduct());
      }

      await Product.insertMany(batch, {
        ordered: false,
      });

      inserted += size;

      console.log(
        `Inserted ${inserted.toLocaleString()} / ${TOTAL_PRODUCTS.toLocaleString()}`
      );
    }

    console.log("Seeding Complete ✅");

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();