const About = require("../models/About");

// @desc    Get all about content
// @route   GET /api/about
// @access  Public
const getAllAbout = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const aboutContent = await About.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await About.countDocuments();

    res.status(200).json({
      success: true,
      count: aboutContent.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: aboutContent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Get active about content
// @route   GET /api/about/active
// @access  Public
const getActiveAbout = async (req, res) => {
  try {
    const aboutContent = await About.getActiveContent();

    if (!aboutContent) {
      return res.status(404).json({
        success: false,
        message: "No active about content found",
      });
    }

    res.status(200).json({
      success: true,
      data: aboutContent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Get single about content by ID
// @route   GET /api/about/:id
// @access  Public
const getAboutById = async (req, res) => {
  try {
    const aboutContent = await About.findById(req.params.id);

    if (!aboutContent) {
      return res.status(404).json({
        success: false,
        message: "About content not found",
      });
    }

    res.status(200).json({
      success: true,
      data: aboutContent,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
      });
    }
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Create new about content
// @route   POST /api/about
// @access  Private/Admin
const createAbout = async (req, res) => {
  try {
    // Set default values for required fields if not provided
    const defaultData = {
      heroContent: {
        title: "Yaaku Indigenous Tribe",
        subtitle: "Guardians of Mukogodo Forest • Keepers of Ancient Wisdom",
        statistics: [
          { label: "Indigenous People", value: "8,000", color: "amber" },
          { label: "Fluent Speaker Remaining", value: "1", color: "red" },
          { label: "Acres Protected", value: "74,000", color: "orange" },
        ],
      },
      images: {
        hero: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
        objectives: [
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
          "https://images.unsplash.com/photo-1574263867128-a3d5c1b1deac",
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176",
          "https://images.unsplash.com/photo-1547036967-23d11aacaee0",
        ],
      },
      visionMission: {
        title: "Our Foundation",
        subtitle: "The pillars that guide our community's journey forward",
        vision: {
          title: "VISION",
          color: "amber",
          description:
            "We envision creating a poverty-free Yaaku community where every person's dignity is protected, especially those affected by human and natural crises.",
        },
        mission: {
          title: "MISSION",
          color: "emerald",
          description:
            "To provide people affected by human and natural crises in the Yaaku community with educational programs, sustainable socio-economic programs, and promote peace building and effective governance.",
        },
      },
      lastUpdatedBy: req.user ? req.user.name : "Admin",
    };

    // Merge default data with request body
    const aboutData = { ...defaultData, ...req.body };

    const aboutContent = await About.create(aboutData);

    res.status(201).json({
      success: true,
      message: "About content created successfully",
      data: aboutContent,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors,
      });
    }
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Update about content
// @route   PUT /api/about/:id
// @access  Private/Admin
// In your backend route handler
const updateAbout = async (req, res) => {
  try {
    const aboutContent = await About.findById(req.params.id);

    if (!aboutContent) {
      return res.status(404).json({
        success: false,
        message: "About content not found",
      });
    }

    // Merge existing content with updates
    const updatedData = {
      ...aboutContent.toObject(), // existing data
      ...req.body, // updates
      lastUpdatedBy: "Admin", // Simplified since we removed user role check
      lastUpdatedAt: new Date(), // Added timestamp
    };

    const updatedAbout = await About.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "About content updated successfully",
      data: updatedAbout,
    });
  } catch (error) {
    console.error("Update error:", error); // Added error logging

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors,
      });
    }

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Delete about content
// @route   DELETE /api/about/:id
// @access  Private/Admin
const deleteAbout = async (req, res) => {
  try {
    const aboutContent = await About.findById(req.params.id);

    if (!aboutContent) {
      return res.status(404).json({
        success: false,
        message: "About content not found",
      });
    }

    await About.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "About content deleted successfully",
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
      });
    }
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Activate about content (set as active)
// @route   PUT /api/about/:id/activate
// @access  Private/Admin
const activateAbout = async (req, res) => {
  try {
    const aboutContent = await About.findById(req.params.id);

    if (!aboutContent) {
      return res.status(404).json({
        success: false,
        message: "About content not found",
      });
    }

    await aboutContent.activate();

    res.status(200).json({
      success: true,
      message: "About content activated successfully",
      data: aboutContent,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
      });
    }
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Get about content statistics
// @route   GET /api/about/stats
// @access  Private/Admin
const getAboutStats = async (req, res) => {
  try {
    const totalContent = await About.countDocuments();
    const activeContent = await About.countDocuments({ isActive: true });
    const recentContent = await About.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    });

    res.status(200).json({
      success: true,
      data: {
        totalContent,
        activeContent,
        recentContent,
        inactiveContent: totalContent - activeContent,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  getAllAbout,
  getActiveAbout,
  getAboutById,
  createAbout,
  updateAbout,
  deleteAbout,
  activateAbout,
  getAboutStats,
};
