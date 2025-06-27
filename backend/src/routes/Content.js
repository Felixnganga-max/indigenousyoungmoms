const express = require("express");
const router = express.Router();
const { upload } = require("../config/cloudinary");
const {
  createContent,
  getAllContent,
  getContentById,
  updateContent,
  deleteContent,
  updateImageCaptions,
} = require("../controllers/Content");

// POST /api/content - Create new content
router.post(
  "/create",

  (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message || "Error uploading images",
        });
      }
      createContent(req, res);
    });
  }
);

// GET /api/content - Get all content with filtering and pagination
router.get("/", getAllContent);

// GET /api/content/:id - Get single content by ID or slug
router.get("/:id", getContentById);

// PUT /api/content/:id - Update content
router.put("/:id", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message || "Error uploading images",
      });
    }
    updateContent(req, res);
  });
});

// DELETE /api/content/:id - Delete content
router.delete("/:id", deleteContent);

// PATCH /api/content/:id/captions - Update image captions
router.patch("/:id/captions", updateImageCaptions);

// Additional utility routes

// GET /api/content/search/:query - Search content
router.get("/search/:query", async (req, res) => {
  try {
    const { query } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const Content = require("../models/Content");

    const searchResults = await Content.find(
      {
        $text: { $search: query },
      },
      {
        score: { $meta: "textScore" },
      }
    )
      .sort({ score: { $meta: "textScore" } })
      .populate("createdBy", "name email")
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Content.countDocuments({
      $text: { $search: query },
    });

    res.json({
      success: true,
      data: searchResults,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Search failed",
    });
  }
});

// GET /api/content/tags/all - Get all unique tags
router.get("/tags/all", async (req, res) => {
  try {
    const Content = require("../models/Content");

    const tags = await Content.aggregate([
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.json({
      success: true,
      data: tags.map((tag) => ({
        name: tag._id,
        count: tag.count,
      })),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch tags",
    });
  }
});

// GET /api/content/stats/dashboard - Get dashboard statistics
router.get("/stats/dashboard", async (req, res) => {
  try {
    const Content = require("../models/Content");

    const stats = await Content.aggregate([
      {
        $group: {
          _id: null,
          totalContent: { $sum: 1 },
          publishedContent: {
            $sum: { $cond: [{ $eq: ["$status", "published"] }, 1, 0] },
          },
          draftContent: {
            $sum: { $cond: [{ $eq: ["$status", "draft"] }, 1, 0] },
          },
          totalViews: { $sum: "$viewCount" },
          averageSubtopics: { $avg: { $size: "$subtopics" } },
        },
      },
    ]);

    const recentContent = await Content.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("createdBy", "name email")
      .select("topic status createdAt viewCount");

    res.json({
      success: true,
      data: {
        statistics: stats[0] || {
          totalContent: 0,
          publishedContent: 0,
          draftContent: 0,
          totalViews: 0,
          averageSubtopics: 0,
        },
        recentContent,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard stats",
    });
  }
});

module.exports = router;
