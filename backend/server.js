const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const errorHandler = require("./middleware/errorHandler");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Home page");
});

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is on port ${PORT}`);
    });
  })
  .catch((error) => {
    res.json(error);
  });
