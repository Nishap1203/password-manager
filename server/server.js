const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

const mongoUri = process.env.MONGO_URI;
mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // serverSelectionTimeoutMS: 100000, // 10 seconds timeout
    // socketTimeoutMS: 45000,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

  const db = mongoose.connection;

  db.on("connected", () => {
    console.log("Mongoose connected to DB");
  });

  db.on("error", (err) => {
    console.log("Mongoose connection error: " + err);
  });

  db.on("disconnected", () => {
    console.log("Mongoose disconnected");
  });

  app.post("/api/auth/register", (req, res) => {
    const { username, password } = req.body;
    // Your registration logic here
    res.status(200).send("User registered successfully");
  });

// console.log("Database URI:", dbURI);

const authRoutes = require("./authController");
app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
``;
