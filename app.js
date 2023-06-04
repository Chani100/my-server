const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const apiRouter = require("./routes/api");
const config = require("config")


const app = express();
app.use(cors());
 app.use(logger("common")); 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api", apiRouter);
app.use((req, res, next) => {
  res.status(404).json({ msg: "page not fond" });
});

module.exports = app;
