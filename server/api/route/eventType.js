const express = require("express");
const router = express.Router();
const eventTypeController = require("../controller/eventTypeController");

// -- Routes
router.post("/newEventType", eventTypeController.newEventTypes);
router.get("/getEventType", eventTypeController.getEventType);
router.delete("/deleteEventType", eventTypeController.deleteEventType);
router.put("/updateEventType", eventTypeController.updateEventType);
router.get("/getEventTypeById/:eventTypeId", eventTypeController.getEventTypeById);

module.exports = router;
