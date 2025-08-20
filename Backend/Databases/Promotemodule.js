const mongoose = require('mongoose');

const PromoteSchema= new mongoose.Schema({
    watchname:String,
    Rupee:Number,
    Dollar:Number,
    Euro:Number,
    ImageUrl:String,
})

module.exports= mongoose.model("promote", PromoteSchema);