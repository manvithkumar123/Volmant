const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/valmont")

const AnalogSchema = new mongoose.Schema({
  watchname: { type: String},
  ImageUrl: { type: String},
  Rupee: { type: Number},
  Dollar: { type: Number},
  Euro: { type: Number},
  specification: { type: String},
  gender: { type: String, enum: ["men", "women", "unisex"]}
});

module.exports = mongoose.model("analog", AnalogSchema);