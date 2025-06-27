// ===================================
// EVENT CONTROLLER (controllers/eventController.js)
// ===================================

const Event = require("../models/Events");
const { cloudinary, upload } = require("../config/cloudinary");

class EventController {
  // Create new event
  static async createEvent(req, res) {
    try {
      const eventData = req.body;

      const event = new Event(eventData);
      await event.save();

      res.status(201).json({
        success: true,
        message: "Event created successfully",
        data: event,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error creating event",
        error: error.message,
      });
    }
  }

  // Get all events
  static async getAllEvents(req, res) {
    try {
      const { page = 1, limit = 10, status, category } = req.query;

      const filter = {};
      if (status) filter.status = status;
      if (category) filter.category = category;

      const events = await Event.find(filter)
        .sort({ startDate: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await Event.countDocuments(filter);

      res.json({
        success: true,
        data: events,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching events",
        error: error.message,
      });
    }
  }

  // Get single event
  static async getEventById(req, res) {
    try {
      const event = await Event.findById(req.params.id);

      if (!event) {
        return res.status(404).json({
          success: false,
          message: "Event not found",
        });
      }

      res.json({
        success: true,
        data: event,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching event",
        error: error.message,
      });
    }
  }

  // Update event
  static async updateEvent(req, res) {
    try {
      const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!event) {
        return res.status(404).json({
          success: false,
          message: "Event not found",
        });
      }

      res.json({
        success: true,
        message: "Event updated successfully",
        data: event,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error updating event",
        error: error.message,
      });
    }
  }

  // Delete event
  static async deleteEvent(req, res) {
    try {
      const event = await Event.findByIdAndDelete(req.params.id);

      if (!event) {
        return res.status(404).json({
          success: false,
          message: "Event not found",
        });
      }

      // Delete images from Cloudinary
      if (event.images.length > 0) {
        const imageIds = event.images.map((img) => img.cloudinaryId);
        await cloudinary.api.delete_resources(imageIds);
      }

      res.json({
        success: true,
        message: "Event deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error deleting event",
        error: error.message,
      });
    }
  }

  // Upload event images
  static uploadImages(req, res) {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Error uploading images",
          error: err.message,
        });
      }

      try {
        const event = await Event.findById(req.params.id);

        if (!event) {
          return res.status(404).json({
            success: false,
            message: "Event not found",
          });
        }

        if (req.files && req.files.length > 0) {
          const newImages = req.files.map((file) => ({
            url: file.path,
            cloudinaryId: file.filename,
            caption: req.body.caption || "",
          }));

          event.images.push(...newImages);
          await event.save();

          res.json({
            success: true,
            message: "Images uploaded successfully",
            data: newImages,
          });
        } else {
          res.status(400).json({
            success: false,
            message: "No images provided",
          });
        }
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Error saving images to event",
          error: error.message,
        });
      }
    });
  }

  // Get upcoming events
  static async getUpcomingEvents(req, res) {
    try {
      const events = await Event.find({
        startDate: { $gte: new Date() },
        status: "upcoming",
      })
        .sort({ startDate: 1 })
        .limit(10);

      res.json({
        success: true,
        data: events,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching upcoming events",
        error: error.message,
      });
    }
  }
}

module.exports = { EventController };
