const mongoose = require("mongoose");

const SubtopicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const ContentSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    subtopics: [SubtopicSchema],
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        publicId: {
          type: String,
          required: true,
        },
        caption: {
          type: String,
          default: "",
        },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    viewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create slug from topic before saving
ContentSchema.pre("save", function (next) {
  if (this.isModified("topic") || this.isNew) {
    this.slug = this.topic
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim("-");

    // Add timestamp to ensure uniqueness
    if (this.isNew) {
      this.slug += "-" + Date.now();
    }
  }
  next();
});

// Virtual for total subtopics count
ContentSchema.virtual("subtopicCount").get(function () {
  return this.subtopics.length;
});

// Index for text search
ContentSchema.index({
  topic: "text",
  "subtopics.title": "text",
  "subtopics.content": "text",
  tags: "text",
});

module.exports = mongoose.model("Content", ContentSchema);
