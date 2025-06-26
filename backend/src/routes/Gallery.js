const express = require("express");
const router = express.Router();
const controllers = require("../controllers/Gallery");
const { upload } = require("../config/cloudinary");

// Gallery routes
router.route("/view").get(controllers.getGalleryItems);

router.route("/create").post(upload, controllers.createGalleryItem);

router.route("/stats").get(controllers.getGalleryStats);

router
  .route("/:id")
  .get(controllers.getGalleryItem)
  .put(controllers.updateGalleryItem)
  .delete(controllers.deleteGalleryItem);

router.route("/:id/like").post(controllers.likeGalleryItem);

module.exports = router;
