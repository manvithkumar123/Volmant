const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/valmont";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

const AnalogSchema = new mongoose.Schema({
  watchname: { type: String },
  ImageUrl: { type: String },
  Rupee: { type: Number },
  Dollar: { type: Number },
  Euro: { type: Number },
  specification: { type: String },
  gender: { type: String, enum: ["men", "women", "unisex"] }
});

module.exports = mongoose.model("analog", AnalogSchema);