const express = require("express");
const eventController = require("./../controllers/eventController");
const authController = require("./../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(eventController.getAllEvents)
  .post(
    authController.protect,
    authController.restrictTo("admin", "leader", "user"),
    eventController.createEvent
  );

router
  .route("/:id")
  .get(eventController.getEvent)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    eventController.uploadEventImages,
    eventController.resizeEventImages,
    eventController.updateEvent
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    eventController.deleteEvent
  );

module.exports = router;
