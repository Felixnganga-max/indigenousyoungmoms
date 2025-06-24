const Gallery = require("../models/Gallery");
const { cloudinary } = require("../config/cloudinary");

// Create a new gallery item with multiple images
exports.createGalleryItem = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Please upload at least one image" });
    }

    // Prepare image data for database
    const images = req.files.map((file) => ({
      url: file.path,
      public_id: file.filename,
    }));

    const galleryItem = new Gallery({
      ...req.body,
      images,
      tags: req.body.tags
        ? req.body.tags.split(",").map((tag) => tag.trim())
        : [],
    });

    await galleryItem.save();

    res.status(201).json({
      success: true,
      data: galleryItem,
    });
  } catch (err) {
    console.error(err);

    // If there's an error, delete any uploaded images from Cloudinary
    if (req.files && req.files.length > 0) {
      const publicIds = req.files.map((file) => file.filename);
      await cloudinary.api.delete_resources(publicIds);
    }

    res.status(500).json({
      success: false,
      message: err.message || "Error creating gallery item",
    });
  }
};

// Get all gallery items with filtering and search
exports.getGalleryItems = async (req, res) => {
  try {
    const {
      category,
      search,
      sort = "-createdAt",
      limit = 12,
      page = 1,
    } = req.query;

    // Build query
    let query = {};

    // Filter by category
    if (category && category !== "all") {
      query.category = category;
    }

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    // Pagination
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Gallery.find(query).sort(sort).skip(skip).limit(parseInt(limit)),
      Gallery.countDocuments(query),
    ]);

    res.json({
      success: true,
      count: items.length,
      total,
      pages: Math.ceil(total / limit),
      data: items,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error fetching gallery items",
    });
  }
};

// Get a single gallery item
exports.getGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found",
      });
    }

    res.json({
      success: true,
      data: item,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error fetching gallery item",
    });
  }
};

// Update a gallery item
exports.updateGalleryItem = async (req, res) => {
  try {
    const { tags, ...updateData } = req.body;

    if (tags) {
      updateData.tags = tags.split(",").map((tag) => tag.trim());
    }

    const item = await Gallery.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found",
      });
    }

    res.json({
      success: true,
      data: item,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error updating gallery item",
    });
  }
};

// Delete a gallery item
exports.deleteGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found",
      });
    }

    // Delete images from Cloudinary
    const publicIds = item.images.map((img) => img.public_id);
    await cloudinary.api.delete_resources(publicIds);

    // Delete from database
    await item.remove();

    res.json({
      success: true,
      data: {},
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error deleting gallery item",
    });
  }
};

// Like a gallery item
exports.likeGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found",
      });
    }

    res.json({
      success: true,
      data: item,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error liking gallery item",
    });
  }
};

// Get gallery statistics
exports.getGalleryStats = async (req, res) => {
  try {
    const stats = await Gallery.aggregate([
      {
        $group: {
          _id: null,
          totalPhotos: { $sum: 1 },
          totalLikes: { $sum: "$likes" },
          totalViews: { $sum: "$views" },
          categories: { $addToSet: "$category" },
        },
      },
      {
        $project: {
          _id: 0,
          totalPhotos: 1,
          totalLikes: 1,
          totalViews: 1,
          categoryCount: { $size: "$categories" },
        },
      },
    ]);

    const categoryCounts = await Gallery.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.json({
      success: true,
      data: {
        ...stats[0],
        categoryCounts,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error fetching gallery stats",
    });
  }
};
