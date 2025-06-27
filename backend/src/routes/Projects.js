const express = require("express");
const router = express.Router();
const { upload } = require("../config/cloudinary");
const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  deleteProjectImage,
  toggleProjectStatus,
} = require("../controllers/Projects");

// @route   GET /api/projects
// @desc    Get all active projects
// @access  Public
router.get("/", getAllProjects);

// @route   GET /api/projects/:id
// @desc    Get single project by ID
// @access  Public
router.get("/:id", getProjectById);

// @route   POST /api/projects
// @desc    Create new project
// @access  Private (you can add auth middleware here)
router.post("/create", upload, createProject);

// @route   PUT /api/projects/:id
// @desc    Update project
// @access  Private (you can add auth middleware here)
router.put("/:id", upload, updateProject);

// @route   DELETE /api/projects/:id
// @desc    Delete project
// @access  Private (you can add auth middleware here)
router.delete("/:id", deleteProject);

// @route   DELETE /api/projects/:projectId/images/:imageId
// @desc    Delete specific image from project
// @access  Private (you can add auth middleware here)
router.delete("/:projectId/images/:imageId", deleteProjectImage);

// @route   PATCH /api/projects/:id/toggle-status
// @desc    Toggle project active status
// @access  Private (you can add auth middleware here)
router.patch("/:id/toggle-status", toggleProjectStatus);

module.exports = router;
