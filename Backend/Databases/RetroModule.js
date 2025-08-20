const mongoose = require("mongoose");

const RetroSchema = new mongoose.Schema({
    watchname: { type: String},
    ImageUrl: { type: String},
    Rupee: { type: Number},
    Dollar: { type: Number},
    Euro: { type: Number},
    specification: { type: String},
    gender: { type: String, enum: ["men", "women", "unisex"]}
})

module.exports=mongoose.model("RetroSchema",RetroSchema)