const express = require("express");
const router = express.Router();
const lotController = require("../controller/lotController");

// -- Routes
router.post("/newLot", lotController.newLot);
router.get("/getLot", lotController.getLot);
router.put("/updateLot", lotController.updateLot);
router.delete("/deleteLot", lotController.deleteLot);
router.get("/getLotById/:lotId", lotController.getLotById);
router.get("/trackLots/:lotId", lotController.trackLots);

module.exports = router;