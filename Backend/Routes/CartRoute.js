const express = require('express');
const router = express.Router();
const User = require('../Databases/LoginModule');
const Analog = require('../Databases/AnalogModule');
const digital = require('../Databases/DigitalModule');
const RetroSchema = require('../Databases/RetroModule');
const smartschema = require('../Databases/SmartModule');
const isLogged = require("../Middlewares/isLogged");
const promote = require('../Databases/Promotemodule');

router.post('/add', isLogged,async (req, res) => {
  const { productId, productType } = req.body;
  // Normalize productType
  let normalizedType = productType.trim();
  if (normalizedType === "digital") normalizedType = "digitalSchema";
  if (normalizedType === "smartwatch") normalizedType = "smartschema";
  if (normalizedType === "retro") normalizedType = "RetroSchema";
  if (normalizedType === "Promote") normalizedType = "promote";
  if (normalizedType === "Promoted") normalizedType = "promote";
  if (normalizedType === "promoted") normalizedType = "promote";

  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    if (!user) return res.status(404).send("User not found");

    const existingItem = user.cart.find(
      item => item.productId.equals(productId) && item.productType === normalizedType
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cart.push({ productId, productType: normalizedType, quantity: 1 });
    }

    await user.save();
    res.status(200).send("Item added to cart");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding to cart");
  }
});
router.get('/', isLogged, async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId).populate("cart.productId");
  res.json(user.cart);
});
// ✅ Get cart items
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) return res.status(404).send("User not found");

    const detailedCart = await Promise.all(
      user.cart.map(async item => {
        let product = null;

        switch (item.productType) {
          case 'analog':
            product = await Analog.findById(item.productId);
            break;
          case 'digitalSchema':
            product = await digital.findById(item.productId);
            break;
          case 'RetroSchema':
            product = await RetroSchema.findById(item.productId);
            break;
          case 'smartschema':
            product = await  smartschema.findById(item.productId);
            break;
          case 'promote':
            product = await promote.findById(item.productId);
            break;
          default:
            product = null;
        }

        return {
          productId: item.productId,
          productType: item.productType,
          quantity: item.quantity,
          price:product?.Rupee,
          name:
            product?.watchname ||
            product?.digitalname ||
            product?.retronicname ||
            product?.smartname ||
            "Unnamed Product",
          image: product?.ImageUrl || ""
        };
      })
    );

    res.status(200).json(detailedCart);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching cart");
  }
});
// DELETE by cart item _id
router.delete('/remove/:cartItemId', isLogged, async (req, res) => {
  const { cartItemId } = req.params;

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).send("User not found");

    user.cart = user.cart.filter(item => item._id.toString() !== cartItemId);
    await user.save();

    res.status(200).send("Item removed from cart");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error removing from cart");
  }
});
module.exports = router;