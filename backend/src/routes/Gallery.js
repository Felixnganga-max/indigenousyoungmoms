const express = require("express");
const router = express.Router();
const controllers = require("../controllers/Gallery");
const { upload } = require("../config/cloudinary");

// Gallery routes
router
  .route("/")
  .get(controllers.getGalleryItems)
  .post(upload, controllers.createGalleryItem);

router.route("/gallery/stats").get(controllers.getGalleryStats);

router
  .route("/gallery/:id")
  .get(controllers.getGalleryItem)
  .put(controllers.updateGalleryItem)
  .delete(controllers.deleteGalleryItem);

router.route("/gallery/:id/like").post(controllers.likeGalleryItem);

module.exports = router;
