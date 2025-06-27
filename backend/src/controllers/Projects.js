const Project = require("../models/Projects");
const { cloudinary } = require("../config/cloudinary");

// Get all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ isActive: true }).sort({
      order: 1,
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching projects",
      error: error.message,
    });
  }
};

// Get single project by ID
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching project",
      error: error.message,
    });
  }
};

// Create new project
const createProject = async (req, res) => {
  try {
    const { title, goal, icon, description, gradient, order } = req.body;

    // Parse description if it's a string
    let parsedDescription = description;
    if (typeof description === "string") {
      try {
        parsedDescription = JSON.parse(description);
      } catch (e) {
        parsedDescription = [description];
      }
    }

    // Handle uploaded images
    const images = [];
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        images.push({
          url: file.path,
          public_id: file.filename,
        });
      });
    }

    const projectData = {
      title,
      goal,
      icon,
      description: parsedDescription,
      gradient,
      images,
      order: order || 0,
    };

    const project = await Project.create(projectData);

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    // If project creation fails, clean up uploaded images
    if (req.files && req.files.length > 0) {
      req.files.forEach(async (file) => {
        try {
          await cloudinary.uploader.destroy(file.filename);
        } catch (cleanupError) {
          console.error("Error cleaning up image:", cleanupError);
        }
      });
    }

    res.status(400).json({
      success: false,
      message: "Error creating project",
      error: error.message,
    });
  }
};

// Update project
const updateProject = async (req, res) => {
  try {
    const { title, goal, icon, description, gradient, order } = req.body;

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Parse description if it's a string
    let parsedDescription = description;
    if (typeof description === "string") {
      try {
        parsedDescription = JSON.parse(description);
      } catch (e) {
        parsedDescription = [description];
      }
    }

    // Handle new uploaded images
    const newImages = [];
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        newImages.push({
          url: file.path,
          public_id: file.filename,
        });
      });
    }

    // Update project data
    const updateData = {
      title: title || project.title,
      goal: goal || project.goal,
      icon: icon || project.icon,
      description: parsedDescription || project.description,
      gradient: gradient || project.gradient,
      order: order !== undefined ? order : project.order,
    };

    // If new images are uploaded, add them to existing images
    if (newImages.length > 0) {
      updateData.images = [...project.images, ...newImages];
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: updatedProject,
    });
  } catch (error) {
    // Clean up uploaded images if update fails
    if (req.files && req.files.length > 0) {
      req.files.forEach(async (file) => {
        try {
          await cloudinary.uploader.destroy(file.filename);
        } catch (cleanupError) {
          console.error("Error cleaning up image:", cleanupError);
        }
      });
    }

    res.status(400).json({
      success: false,
      message: "Error updating project",
      error: error.message,
    });
  }
};

// Delete project image
const deleteProjectImage = async (req, res) => {
  try {
    const { projectId, imageId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const imageToDelete = project.images.id(imageId);

    if (!imageToDelete) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(imageToDelete.public_id);

    // Remove image from project
    project.images.pull(imageId);
    await project.save();

    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting image",
      error: error.message,
    });
  }
};

// Delete project
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Delete all images from Cloudinary
    if (project.images && project.images.length > 0) {
      const deletePromises = project.images.map((image) =>
        cloudinary.uploader.destroy(image.public_id)
      );
      await Promise.all(deletePromises);
    }

    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting project",
      error: error.message,
    });
  }
};

// Toggle project status (active/inactive)
const toggleProjectStatus = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    project.isActive = !project.isActive;
    await project.save();

    res.status(200).json({
      success: true,
      message: `Project ${
        project.isActive ? "activated" : "deactivated"
      } successfully`,
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error toggling project status",
      error: error.message,
    });
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  deleteProjectImage,
  toggleProjectStatus,
};
