const express = require("express");
const router = express.Router();
const eventOutputLotController = require("../controller/eventOutputLotController");

// -- Routes
router.post("/newEventOutputLot", eventOutputLotController.newEventOutputLot);
router.get("/getEventOutputLot", eventOutputLotController.getEventOutputLot);
router.put("/updateEventOutputLot", eventOutputLotController.updateEventOutputLot);
router.delete("/deleteEventOutputLot", eventOutputLotController.deleteEventOutputLot);
router.get("/getEventOutputLotById", eventOutputLotController.getEventOutputLotById);

module.exports = router;