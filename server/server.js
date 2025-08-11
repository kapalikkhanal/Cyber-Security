require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./api/routes");
const authRoutes = require("./api/authRoutes");
const db = require("./db"); // Import the database module

const app = express();
app.use(cors());
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", routes);

app.listen(PORT, async () => {
  try {
    await db.init();
    console.log(`Server running on http://localhost:${PORT}`);
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
});
