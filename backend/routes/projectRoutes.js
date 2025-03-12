const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const { isAuthenticated } = require("../middleware/auth");

// Create a new Project
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const newProject = await Project.create({
      ...req.body,
      user: req.user._id,
    });
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get All Projects (only for authenticated users)
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get Single Project
router.get("/:id", isAuthenticated, async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!project) {
      return res.status(404).json({ message: "Project or User not found" });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update Single Project
router.put("/:id", isAuthenticated, async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!project) {
      return res.status(404).json({ message: "Project or User not found" });
    }

    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json(updated);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete a Project
router.delete("/:id", isAuthenticated, async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!project) {
      return res.status(404).json({ message: "Project or User not found" });
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({
      message: `Deleted project with id: ${req.params.id} successfully`,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
