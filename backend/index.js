const helmet = require("helmet");

// Helmet middleware for security
// sets various HTTP headers to help protect the app
// from well-known web vulnerabilities.
app.use(helmet());

const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");

dotenv.config({
  path: path.join(__dirname, '../.env')
});

const PORT = process.env.PORT || 3000;
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Setup mongoose connections
mongoose.connection.on('error', (err) => {
  console.log(err);
  console.log("mongodb connection failed. Check mongo URL.")
  process.exit(1);
});

mongoose.connection.on('connected', () => {
  console.log("mongodb connection successful!")
});

mongoose.connect(process.env.MONGO_URL, {});

// middleware
app.use(express.json());
app.use(cookieParser());


// routes
const authRoutes = require("./routes/auth.js");
const { kMaxLength } = require("buffer");

// API routes
app.use("/api/auth", authRoutes);

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Catch-all handler: send back React's index.html file for any non-API routes
app.get('/*splat', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`express app running on port ${PORT}`);
});
