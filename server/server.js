require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./api/routes");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
