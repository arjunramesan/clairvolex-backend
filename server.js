const express = require("express");
const bodyParser = require("body-parser");
const { searchBooks } = require("./controllers/bookController");
const { generateToken, authenticateToken } = require("./controllers/tokenController");
require('dotenv').config();


const app = express();
const port = process.env.PORT;
app.use(bodyParser.json());

// API Routes
app.get("/", (req, res) => {
  return res.status(200).json({ message: "API Running.." });
});
app.post("/books", authenticateToken, (req, res) => {
  searchBooks(req.body, res);
});
app.post('/generate-token', (req, res) => {
   generateToken(req.body, res)
});

// Error handling middleware
app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint not found" });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "Internal server error" });
});


module.exports = app;

