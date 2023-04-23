const express = require("express");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");

// To config our .env file
dotenv.config();

const app = express();

//middlewares
app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Working fine");
})

app.listen(process.env.PORT || 5000, (req, res)=>{
    console.log("Server running on port 5000... Press Ctrl+C to exit server.");
})