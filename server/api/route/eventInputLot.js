const express = require("express");
const router = express.Router();
const eventInputLotController = require("../controller/eventInputLotController");

// -- Routes
router.post("/newEventInputLot", eventInputLotController.newEventInputLot);
router.get("/getEventInputLot", eventInputLotController.getEventInputLot);
router.put("/updateEventInputLot", eventInputLotController.updateEventInputLot);
router.delete("/deleteEventInputLot", eventInputLotController.deleteEventInputLot);
router.get("/getEventInputLotById", eventInputLotController.getEventInputLotById);

module.exports = router;