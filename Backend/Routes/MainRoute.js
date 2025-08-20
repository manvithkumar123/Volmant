const express = require("express");
const router = express.Router();
const promoted = require("../Databases/Promotemodule");
const Analog = require("../Databases/AnalogModule");
const Digital = require("../Databases/DigitalModule");
const Smartwatch = require("../Databases/SmartModule");
const Retro = require("../Databases/RetroModule");

router.get("/view/:id", async (req, res) => {
  try {
      const analog = await Analogschema.findById(req.params.id);
      if (!analog) {
          return res.status(404).json({ error: "Analog not found" });
      }
      res.json(analog);
  } catch (error) {
      res.status(500).json({ error: "Unknown error occurred in viewing analog by ID" });
  }
});
router.get("/:type", async (req, res) => {
  const { type } = req.params;
  try {
    let Model;
    switch (type) {
      case "analog":
        Model = Analog;
        break;
      case "digital":
        Model = Digital;
        break;
      case "smartwatch":
        Model = Smartwatch;
        break;
      case "promote":
        Model = Smartwatch;
        break;
      case "retro":
        Model = Retro;
        break;
        case "promoted":
          Model = promoted;
          break;
      default:
        return res.status(400).send("Invalid type");
    }

    const data = await Model.find();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
module.exports = router;