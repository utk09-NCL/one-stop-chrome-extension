const express = require("express");
const router = express.Router();
const Link = require("../models/Link");
const { isAuthenticated } = require("../middleware/auth");

// Create a new Link
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const newLink = await Link.create({ ...req.body, user: req.user._id });
    res.status(201).json(newLink);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get All Links (with project filter) (only for authenticated users)
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const { projectId } = req.query;
    const query = {
      user: req.user._id,
      project: projectId,
    };

    // if (projectId) {
    //   query.project = projectId;
    // }

    const links = await Link.find(query).sort({ createdAt: -1 });
    res.json(links);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get Single Link
router.get("/:id", isAuthenticated, async (req, res) => {
  try {
    const link = await Link.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!link) {
      return res.status(404).json({ message: "Link or User not found" });
    }

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
