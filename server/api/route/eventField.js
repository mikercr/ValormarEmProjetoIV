const express = require("express");
const router = express.Router();
const eventFieldController = require("../controller/eventFieldController");

// -- Routes
router.post("/newEventField", eventFieldController.newEventField);
router.get("/getEventField", eventFieldController.getEventField);
router.delete("/deleteEventField", eventFieldController.deleteEventField);
router.put("/updateEventField", eventFieldController.updateEventField);
router.get("/getEventFieldById", eventFieldController.getEventFieldById);
router.post("/associateEventFieldWithType", eventFieldController.associateEventFieldWithType);

module.exports = router;