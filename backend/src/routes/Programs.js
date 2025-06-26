const express = require("express");
const router = express.Router();
const { upload, cloudinary } = require("../config/cloudinary");
const {
  getAllPrograms,
  getProgram,
  createProgram,
  updateProgram,
  deleteProgram,
} = require("../controllers/Programs");

// Routes
router.get("/", getAllPrograms);
router.get("/:id", getProgram);
router.post("/create", upload, createProgram);
router.put("/:id", upload, updateProgram);
router.delete("/:id", deleteProgram);

module.exports = router;
