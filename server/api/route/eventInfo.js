const express = require("express");
const router = express.Router();
const eventInfoController = require("../controller/eventInfoController");

// -- Routes
router.post("/newEventInfo", eventInfoController.newEventInfo);
router.get("/getEventInfo", eventInfoController.getEventInfo);
router.delete("/deleteEventInfo", eventInfoController.deleteEventInfo);
//router.put("/updateEventInfo", eventInfoController.updateEventInfo);
//router.get("/getEventInfoById", eventInfoController.getEventInfoById);

module.exports = router;