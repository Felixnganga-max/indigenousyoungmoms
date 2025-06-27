const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    goal: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String,
      required: true,
      enum: ["TreePine", "Users", "Sparkles", "Heart", "Globe"],
      default: "Sparkles",
    },
    description: [
      {
        type: String,
        required: true,
      },
    ],
    gradient: {
      type: String,
      required: true,
      default: "from-blue-400 via-indigo-500 to-purple-600",
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
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
projectSchema.index({ isActive: 1, order: 1 });

module.exports = mongoose.model("Project", projectSchema);
