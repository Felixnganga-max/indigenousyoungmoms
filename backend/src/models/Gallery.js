const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: [
      "workshops",
      "cultural",
      "family",
      "education",
      "achievements",
      "community",
      "support",
    ],
  },
  event: {
    type: String,
    required: [true, "Event name is required"],
    trim: true,
  },

  location: {
    type: String,
    // required: [true, "Location is required"],
    trim: true,
  },
  photographer: {
    type: String,
    // required: [true, "Photographer name is required"],
    trim: true,
  },
  images: [
    {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },
  ],
  tags: [
    {
      type: String,
      trim: true,
    },
  ],
  likes: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Text index for search functionality
gallerySchema.index({
  title: "text",
  description: "text",
  event: "text",
  location: "text",
  photographer: "text",
  tags: "text",
});

// Update the updatedAt field before saving
gallerySchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Gallery = mongoose.model("Gallery", gallerySchema);

module.exports = Gallery;
