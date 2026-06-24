const express = require("express");
const cors = require("cors");
const path = require("path");
const productRoutes = require("./routes/productRoutes");

function createApp() {
  const app = express();

  app.use(cors({
      origin: "https://codevector-internship-assignment.vercel.app",
      credentials: true,
  }));
  app.use(express.json());

  app.get("/health", (req, res) => {
    return res.json({ status: "ok" });
  });

  app.use("/api/products", productRoutes);

  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  });

  return app;
}

module.exports = { createApp };