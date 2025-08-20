const mongoose=require('mongoose')

const LoginSchema = new mongoose.Schema({
    Username: String,
    Password: {
        type: String,
        required: true,
        minlength: 5
    },
    cart: [
        {
          productId: { 
            type: mongoose.Schema.Types.ObjectId, 
            required: true,
            refPath: "cart.productType" 
          },
          productType: { 
            type: String, 
            required: true, 
            enum: ["analog", "digitalSchema", "smartschema", "RetroSchema",'promote'] 
          },
          quantity: { type: Number, default: 1 }
        }
      ]
})
module.exports = mongoose.model("loginSchema",LoginSchema)