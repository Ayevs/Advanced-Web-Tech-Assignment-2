//this is my backend server file
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Humber = require("./humberSchema");

const PORT = 3001; //3001 will be the port number for the backend
const app = express();
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/HumberSocialClub");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("connected to the database");
});

app.get("/getUsers", (req, res) => {
  Humber.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
