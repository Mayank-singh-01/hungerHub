const express = require("express");
const router = express.Router();

router.post("/foodData", (req, res) => {
  try {
    if (!global.foodData || !global.foodCategory) {
      return res.status(500).send("Food data or category not loaded");
    }
    res.send({ foodData: global.foodData, foodCategory: global.foodCategory });
    //  console.log("Food Data:", global.foodData);
    //  console.log("Food Category:", global.foodCategory);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
