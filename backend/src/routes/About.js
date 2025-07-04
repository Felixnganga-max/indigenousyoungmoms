const express = require("express");
const router = express.Router();
const {
  getAllAbout,
  getActiveAbout,
  getAboutById,
  createAbout,
  updateAbout,
  deleteAbout,
  activateAbout,
  getAboutStats,
} = require("../controllers/About");

// Middleware (you can uncomment these if you have authentication middleware)
// const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get("/about-data", getAllAbout);
router.get("/active", getActiveAbout);
router.get("/:id", getAboutById);

// Protected routes (uncomment middleware when ready)
// router.use(protect); // Protect all routes below this line
// router.use(authorize('admin')); // Only admin can access routes below

// Admin routes
router.post("/create-about", createAbout);
router.put("/:id", updateAbout);
router.delete("/:id", deleteAbout);
router.put("/:id/activate", activateAbout);
router.get("/admin/stats", getAboutStats);

module.exports = router;
