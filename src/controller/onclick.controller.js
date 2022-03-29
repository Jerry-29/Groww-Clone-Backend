const { Router } = require("express");
const proRedisModel = require("../models/pro.redis");
const clickedModel = require("../models/clickedPro.model");

const router = Router();



router.post("/carts", async (req, res) => {
  try {
    const products = await proRedisModel.create(req.body);
      return res.status(200).send(products);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.post("/clicked", async (req, res) => {
  try {
    await clickedModel.deleteMany();
    const products = await clickedModel.create(req.body);
    return res.send(products);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("/clicked_get", async (req, res) => {
        try {
          const pros = await clickedModel.find().lean().exec();
          return res.status(200).send(pros);
        } catch (err) {
          console.log(err.message);
        }
});

router.delete("/payment", async (req, res) => {
  try {
    await proRedisModel.deleteMany();
    return res.send("deleted");
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("cart_get", async (req, res) => {
        try {
          const pros = await proRedisModel.find().lean().exec();
          return res.status(200).send(pros);
        } catch (err) {
          console.log(err.message);
        }
});

module.exports = router;
