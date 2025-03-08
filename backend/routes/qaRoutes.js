const express = require("express");
const router = express.Router();
const QA = require("../models/QA");

// Create a new Question-Answer (Q&A)
router.post("/", async (req, res) => {
  try {
    const newQA = await QA.create(req.body);
    res.status(201).json(newQA);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get All Q&A's
router.get("/", async (req, res) => {
  try {
    const qas = await QA.find().sort({ createdAt: -1 });
    res.json(qas);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get Single Q&A
router.get("/:id", async (req, res) => {
  try {
    const qa = await QA.findById(req.params.id);
    res.json(qa);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update Single Q&A
router.put("/:id", async (req, res) => {
  try {
    const updated = await QA.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json(updated);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete a Q&A
router.delete("/:id", async (req, res) => {
  try {
    await QA.findByIdAndDelete(req.params.id);
    res.json({
      message: `Deleted q&a with id: ${req.params.id} successfully`,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
