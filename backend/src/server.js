require("dotenv").config();

const { createApp } = require("./app.js");
const { connectDB } = require("./config/db.js");

async function start() {
  await connectDB();

  const app = createApp();
  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});