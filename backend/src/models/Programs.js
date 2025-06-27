const mongoose = require("mongoose");

// Program Schema
const programSchema = new mongoose.Schema(
  {
    // Basic Info
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },

    // Program Type
    programType: {
      type: String,
      required: true,
    },

    // Images
    images: [
      {
        url: String,
        publicId: String,
      },
    ],

    // Program Features
    features: [String],

    // Status
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    // SEO
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate slug from title
programSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }
  next();
});

const Program = mongoose.model("Program", programSchema);

module.exports = Program;
