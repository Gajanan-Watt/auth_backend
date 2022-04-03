const express = require("express");
const { modelName } = require("../model/user.model");
const protect = require("../middleware/authenticate");

const user = require("../model/user.model");

const router = express.Router();

router.post("/", protect, async (req, res) => {
  try {
    const user = await user.create(req.body);
    console.log(user);
    return res.status(200).send(user);
  } catch (e) {
    return res.status(400).json({ message: e.message, status: "Failed" });
  }
});

router.get("/", async (req, res) => {
  try {
    const user = await user.find();
    // console.log(user);
    return res.status(200).send(user);
  } catch (e) {
    return res.status(400).json({ message: e.message, status: "Failed" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await user.findById(req.params.id);
    // console.log(user);
    return res.status(200).send(user);
  } catch (e) {
    return res.status(400).json({ message: e.message, status: "Failed" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const user = await user.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    // console.log(user);
    return res.status(200).send(user);
  } catch (e) {
    return res.status(400).json({ message: e.message, status: "Failed" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await user.findByIdAndDelete(req.params.id);
    // console.log(user);
    return res.status(200).send(user);
  } catch (e) {
    return res.status(400).json({ message: e.message, status: "Failed" });
  }
});

module.exports = router;
