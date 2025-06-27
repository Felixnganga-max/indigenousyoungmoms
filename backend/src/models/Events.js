// ===================================
// EVENT MODEL (models/Event.js)
// ===================================

const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    // Basic Event Information
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "ceremony",
        "workshop",
        "community",
        "environmental",
        "cultural",
        "educational",
        "conference",
        "meeting",
      ],
      default: "community",
    },

    // Date and Time
    startDate: {
      type: Date,
      // required: true,
    },
    endDate: {
      type: Date,
      // required: true,
    },

    // Location
    location: {
      name: {
        type: String,
        required: true,
      },
      address: String,
      city: String,
      state: String,
      country: String,
    },

    // Organizer
    organizer: {
      name: {
        type: String,
        required: true,
      },
      email: String,
      phone: String,
      organization: String,
    },

    // Event Details
    maxAttendees: {
      type: Number,
      default: 100,
    },
    registrationRequired: {
      type: Boolean,
      default: false,
    },
    ticketPrice: {
      type: Number,
      default: 0,
    },

    // Media
    images: [
      {
        url: String,
        cloudinaryId: String,
        caption: String,
      },
    ],

    // Status
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed", "cancelled"],
      default: "upcoming",
    },

    tags: [String],

    // Administrative
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
eventSchema.index({ startDate: 1 });
eventSchema.index({ category: 1 });
eventSchema.index({ status: 1 });

module.exports = mongoose.model("Event", eventSchema);
