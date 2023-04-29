const express = require("express");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const mongoDBConnection = require("./config/db");

// To config our .env file
dotenv.config();
mongoDBConnection();

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

//Routes
app.use("/api/v1/user", require("./routes/userRoutes"));

app.get("/", (req, res) => {
  res.send("Working fine");
});

app.listen(process.env.PORT || 5000, (req, res) => {
  console.log("Server running on port 5000... Press Ctrl+C to exit server.");
});
