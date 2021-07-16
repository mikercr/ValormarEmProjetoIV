const express = require("express");
const router = express.Router();
const testeController = require("../controller/testeController");

// -- Routes teste
router.post("/newTeste", testeController.newTeste);
router.get("/getTeste", testeController.getTeste);
router.delete("/deleteTesteById", testeController.deleteTesteById);

module.exports = router;