const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const connection = require("./src/db/connect");

const app = express();

const PORT = process.env.PORT || 8000;

connection();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});