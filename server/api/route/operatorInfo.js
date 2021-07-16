const express = require("express");
const router = express.Router();
const operatorInfoController = require("../controller/operatorInfoController");

router.post("/newOperatorInfo", operatorInfoController.newOperatorInfo);
router.get("/getOperatorInfo", operatorInfoController.getOperatorInfo);
router.get("/getOperatorInfoByOperatorId", operatorInfoController.getOperatorInfoByOperatorId);

module.exports = router;