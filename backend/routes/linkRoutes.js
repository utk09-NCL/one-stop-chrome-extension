const express = require("express");
const router = express.Router();
const Link = require("../models/Link");

// Create a new Link
router.post("/", async (req, res) => {
  try {
    const newLink = await Link.create(req.body);
    res.status(201).json(newLink);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get All Links
router.get("/", async (req, res) => {
  try {
    const links = await Link.find().sort({ createdAt: -1 });
    res.json(links);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get Single Link
router.get("/:id", async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    res.json(link);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update Single Link
router.put("/:id", async (req, res) => {
  try {
    const updated = await Link.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json(updated);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete a Link
router.delete("/:id", async (req, res) => {
  try {
    await Link.findByIdAndDelete(req.params.id);
    res.json({
      message: `Deleted link with id: ${req.params.id} successfully`,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
