// ===================================
// EVENT ROUTES (routes/eventRoutes.js)
// ===================================
const express = require("express");
const router = express.Router();
const { EventController } = require("../controllers/Events");

// Public routes - no authentication required
router.get("/", EventController.getAllEvents);
router.get("/upcoming", EventController.getUpcomingEvents);
router.get("/:id", EventController.getEventById);
router.post("/create", EventController.createEvent);
router.put("/:id", EventController.updateEvent);
router.delete("/:id", EventController.deleteEvent);
router.post("/:id/images", EventController.uploadImages);

module.exports = router;
