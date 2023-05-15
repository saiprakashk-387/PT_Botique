require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());

app.use(morgan("dev"));

//routes
app.use(require("./routes/users"));
app.use(require("./routes/products"));
app.use(require("./routes/carts"));
app.use(require("./routes/order"));

mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("mongoose connected successfully");
});
mongoose.connection.on("err", (err) => {
  console.log("mongoose error", err);
});

app.get("/", (req, res) => {
  res.send("<h1>Welcome to patnam-trends-botique</h1>");
});

app.listen(process.env.PORT, () => {
  console.log("server listening on port 5000");
});
