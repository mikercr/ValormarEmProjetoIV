const express = require("express");
const router = express.Router();
const operatorController = require("../controller/operatorController");
//const auth = require("../../config/auth");

// -- Routes
router.post("/newOperator", operatorController.newOperatorWithInfoAndCoor);
router.post("/newOperatorWithInfo", operatorController.newOperatorWithInfo);
router.post("/newOperatorWithInfoAndCoor", operatorController.newOperatorWithInfoAndCoor);
router.get("/getOperator", operatorController.getOperator);
router.get("/getOperatorAPP", operatorController.getOperatorAPP);
router.delete("/deleteOperator", operatorController.deleteOperator);
router.put("/updateOperator", operatorController.updateOperator);
router.get("/getOperatorById/:operatorId", operatorController.getOperatorById);
router.get("/getOperatorByNif", operatorController.getOperatorByNif);
router.delete("/deleteOperatorByNif", operatorController.deleteOperatorByNif);



module.exports = router;
