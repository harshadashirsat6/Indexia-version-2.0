const express = require("express");
require("dotenv").config();
const app = require("./app");

const Port = process.env.PORT || 9000;

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connection established");
  })
  .catch((err) => {
    console.log("OOPS! database connection failed", err);
  });

app.listen(Port, (port) => {
    console.log("Server is running on port:", Port);
});
