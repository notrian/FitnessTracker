require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const PORT = 3000;

// Db connection
const client = require("./db/client.js");
client.connect();

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, "./client", "dist")));

// Routes
app.use("/api", require("./routes"));

// Front End React Page
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "./client/dist", "index.html"));
});

// Error Handler
app.use((err, req, res, next) => {
  res.send({
    name: err.name,
    message: err.message,
    data: err.stack || err.data,
  });
});

// Sereve App
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
