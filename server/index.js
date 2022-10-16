const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();
// use express.json() to get data into json format
app.use(express.json());

//port
const PORT = process.env.PORT || 5800;

//use cors -> allow access from different address(localhost:3000 => 5500)
app.use(cors());

//importing routes
const TodoItemRoute = require("./routes/todoItems");

//connecting to mongodb
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => console.log("DB connected!"))
  .catch((err) => console.log(err));

app.use("/", TodoItemRoute);

//add port and connect to server
app.listen(PORT, () => console.log("server connected"));
