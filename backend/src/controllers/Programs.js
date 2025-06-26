const Program = require("../models/Programs");
const { cloudinary } = require("../config/cloudinary");

// Get all programs
const getAllPrograms = async (req, res) => {
  try {
    const { programType, status = "active" } = req.query;

    const query = { status };
    if (programType) query.programType = programType;

    const programs = await Program.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: programs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single program
const getProgram = async (req, res) => {
  try {
    const { id } = req.params;

    const program = await Program.findById(id);

    if (!program) {
      return res.status(404).json({
        success: false,
        message: "Program not found",
      });
    }

    res.json({
      success: true,
      data: program,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createProgram = async (req, res) => {
  try {
    const { title, description, programType, features } = req.body;

    // Handle image uploads
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => ({
        url: file.path,
        publicId: file.filename,
      }));
    }

    const program = await Program.create({
      title,
      description,
      programType,
      features: Array.isArray(features)
        ? features
        : features
        ? features.split(",").map((f) => f.trim())
        : [],
      images,
    });

    res.status(201).json({
      success: true,
      message: "Program created successfully",
      data: program,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update program
const updateProgram = async (req, res) => {
  try {
    const { id } = req.params;

    let program = await Program.findById(id);

    if (!program) {
      return res.status(404).json({
        success: false,
        message: "Program not found",
      });
    }

    // Handle new image uploads
    if (req.files && req.files.length > 0) {
      // Delete old images from cloudinary
      if (program.images && program.images.length > 0) {
        for (const img of program.images) {
          await cloudinary.uploader.destroy(img.publicId);
        }
      }

      // Upload new images
      const newImages = req.files.map((file) => ({
        url: file.path,
        publicId: file.filename,
      }));

      req.body.images = newImages;
    }

    // Handle features
    if (req.body.features && typeof req.body.features === "string") {
      req.body.features = req.body.features.split(",").map((f) => f.trim());
    }

    program = await Program.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      message: "Program updated successfully",
      data: program,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete program
const deleteProgram = async (req, res) => {
  try {
    const { id } = req.params;

    const program = await Program.findById(id);

    if (!program) {
      return res.status(404).json({
        success: false,
        message: "Program not found",
      });
    }

    // Delete images from cloudinary
    if (program.images && program.images.length > 0) {
      for (const img of program.images) {
        await cloudinary.uploader.destroy(img.publicId);
      }
    }

    await Program.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Program deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllPrograms,
  getProgram,
  createProgram,
  updateProgram,
  deleteProgram,
};
