const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// IF DEVELOPMENT MODE REQUIRE ENV FILE LOCALLY
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = new express();
const database_connection = process.env.DATABASE_CONNECTION;

mongoose
  .connect(database_connection, { useNewUrlParser: true })
  .then(() => console.log("You are now connected to Mongo"))
  .catch((err) => console.error("Something went wrong", err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  next();
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));

  app.get(["/", "/*"], (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(process.env.PORT || 4000, () => {
  console.log(`App listening on port ${process.env.PORT || 4000}`);
});
