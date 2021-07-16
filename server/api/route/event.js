const express = require("express");
const router = express.Router();
const eventController = require("../controller/eventController");

// -- Routes
router.post("/newEvent", eventController.newEventFinalEmTeste);
router.get("/getEvent", eventController.getEvent);
router.delete("/deleteEvent", eventController.deleteEvent);
router.put("/updateEvent", eventController.updateEvent);
router.get("/getEventById", eventController.getEventById);
//router.get("/getEventByName", eventController.getEventByName);
router.get("/exportEvent/:eventId", eventController.exportEventFinalEmTeste);
router.get("/populateEvent", eventController.populateEvent);

module.exports = router;
