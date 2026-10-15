const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const connection = require("./src/db/connect");
const adminAuthRouter = require("./src/routers/adminAuth.router");

const app = express();

const PORT = process.env.PORT || 8000;

// CORS Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Body parser
app.use(express.json());

// API Routes
app.use("/api/admin", adminAuthRouter);

connection();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});