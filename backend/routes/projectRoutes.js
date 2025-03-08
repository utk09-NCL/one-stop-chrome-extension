const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// Create a new Project
router.post("/", async (req, res) => {
  try {
    const newProject = await Project.create(req.body);
    res.json(newProject);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get All Projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
