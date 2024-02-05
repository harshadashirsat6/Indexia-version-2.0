const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


const userRoutes = require("./routes/userRoutes");
const franchiseRoutes = require("./routes/franchiseRoutes");
const commonRoutes = require("./routes/commonRoutes");


// // Routes
app.use(userRoutes)
app.use(franchiseRoutes);
app.use(commonRoutes)
app.get("/", async (req, resp) => {
  resp.send("Project Running Successfully");
});

module.exports = app;
