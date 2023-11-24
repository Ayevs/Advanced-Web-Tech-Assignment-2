const mongoose = require("mongoose");

//define the schema
const humberSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  isActive: Boolean,
});

//then we create a model from the schema
const Humber = mongoose.model("User", humberSchema, "User");

module.exports = Humber;
