const Content = require("../models/Content");
const { cloudinary } = require("../config/cloudinary");

// Create new content
const createContent = async (req, res) => {
  try {
    const { topic, subtopics, tags, status = "draft", createdBy } = req.body;

    // Parse subtopics if it's a string (from form data)
    let parsedSubtopics = [];
    if (typeof subtopics === "string") {
      try {
        parsedSubtopics = JSON.parse(subtopics);
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: "Invalid subtopics format",
        });
      }
    } else {
      parsedSubtopics = subtopics || [];
    }

    // Parse tags if it's a string
    let parsedTags = [];
    if (typeof tags === "string") {
      try {
        parsedTags = JSON.parse(tags);
      } catch (error) {
        parsedTags = tags.split(",").map((tag) => tag.trim());
      }
    } else {
      parsedTags = tags || [];
    }

    // Handle uploaded images
    const images = [];
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        images.push({
          url: file.path,
          publicId: file.filename,
          caption: "", // Can be added later via update
        });
      });
    }

    // Create content
    const content = new Content({
      topic,
      subtopics: parsedSubtopics,
      images,
      createdBy: createdBy || null, // Use createdBy from request body or null
      status,
      tags: parsedTags,
    });

    await content.save();

    // Only populate if createdBy exists
    if (content.createdBy) {
      await content.populate("createdBy", "name email");
    }

    res.status(201).json({
      success: true,
      message: "Content created successfully",
      data: content,
    });
  } catch (error) {
    console.error("Create content error:", error);

    // Clean up uploaded images if content creation fails
    if (req.files && req.files.length > 0) {
      req.files.forEach(async (file) => {
        try {
          await cloudinary.uploader.destroy(file.filename);
        } catch (cleanupError) {
          console.error("Error cleaning up image:", cleanupError);
        }
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || "Failed to create content",
    });
  }
};

// Get all content with filtering and pagination
const getAllContent = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      search,
      tags,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    const query = {};

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    // Filter by tags
    if (tags) {
      const tagArray = tags.split(",").map((tag) => tag.trim());
      query.tags = { $in: tagArray };
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

    const contents = await Content.find(query)
      .populate("createdBy", "name email")
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Content.countDocuments(query);

    res.json({
      success: true,
      data: contents,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Get all content error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch content",
    });
  }
};

// Get single content by ID or slug
const getContentById = async (req, res) => {
  try {
    const { id } = req.params;

    // Try to find by ID first, then by slug
    let content = await Content.findById(id).populate(
      "createdBy",
      "name email"
    );

    if (!content) {
      content = await Content.findOne({ slug: id }).populate(
        "createdBy",
        "name email"
      );
    }

    if (!content) {
      return res.status(404).json({
        success: false,
        message: "Content not found",
      });
    }

    // Increment view count
    await Content.findByIdAndUpdate(content._id, { $inc: { viewCount: 1 } });

    res.json({
      success: true,
      data: content,
    });
  } catch (error) {
    console.error("Get content by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch content",
    });
  }
};

// Update content
const updateContent = async (req, res) => {
  try {
    const { id } = req.params;
    const { topic, subtopics, tags, status, removeImages } = req.body;

    const content = await Content.findById(id);
    if (!content) {
      return res.status(404).json({
        success: false,
        message: "Content not found",
      });
    }

    // Parse data similar to create
    let parsedSubtopics = subtopics;
    if (typeof subtopics === "string") {
      try {
        parsedSubtopics = JSON.parse(subtopics);
      } catch (error) {
        parsedSubtopics = content.subtopics;
      }
    }

    let parsedTags = tags;
    if (typeof tags === "string") {
      try {
        parsedTags = JSON.parse(tags);
      } catch (error) {
        parsedTags = tags.split(",").map((tag) => tag.trim());
      }
    }

    // Handle image removal
    if (removeImages && removeImages.length > 0) {
      const imagesToRemove = Array.isArray(removeImages)
        ? removeImages
        : [removeImages];

      for (const publicId of imagesToRemove) {
        try {
          await cloudinary.uploader.destroy(publicId);
          content.images = content.images.filter(
            (img) => img.publicId !== publicId
          );
        } catch (error) {
          console.error("Error removing image:", error);
        }
      }
    }

    // Add new images
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        content.images.push({
          url: file.path,
          publicId: file.filename,
          caption: "",
        });
      });
    }

    // Update content fields
    if (topic) content.topic = topic;
    if (parsedSubtopics) content.subtopics = parsedSubtopics;
    if (parsedTags) content.tags = parsedTags;
    if (status) content.status = status;

    await content.save();

    // Only populate if createdBy exists
    if (content.createdBy) {
      await content.populate("createdBy", "name email");
    }

    res.json({
      success: true,
      message: "Content updated successfully",
      data: content,
    });
  } catch (error) {
    console.error("Update content error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update content",
    });
  }
};

// Delete content
const deleteContent = async (req, res) => {
  try {
    const { id } = req.params;

    const content = await Content.findById(id);
    if (!content) {
      return res.status(404).json({
        success: false,
        message: "Content not found",
      });
    }

    // Delete associated images from Cloudinary
    if (content.images && content.images.length > 0) {
      for (const image of content.images) {
        try {
          await cloudinary.uploader.destroy(image.publicId);
        } catch (error) {
          console.error("Error deleting image from Cloudinary:", error);
        }
      }
    }

    await Content.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Content deleted successfully",
    });
  } catch (error) {
    console.error("Delete content error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete content",
    });
  }
};

// Update image captions
const updateImageCaptions = async (req, res) => {
  try {
    const { id } = req.params;
    const { captions } = req.body; // Array of {publicId, caption}

    const content = await Content.findById(id);
    if (!content) {
      return res.status(404).json({
        success: false,
        message: "Content not found",
      });
    }

    // Update captions
    captions.forEach(({ publicId, caption }) => {
      const image = content.images.find((img) => img.publicId === publicId);
      if (image) {
        image.caption = caption;
      }
    });

    await content.save();

    res.json({
      success: true,
      message: "Image captions updated successfully",
      data: content,
    });
  } catch (error) {
    console.error("Update image captions error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update image captions",
    });
  }
};

module.exports = {
  createContent,
  getAllContent,
  getContentById,
  updateContent,
  deleteContent,
  updateImageCaptions,
};
