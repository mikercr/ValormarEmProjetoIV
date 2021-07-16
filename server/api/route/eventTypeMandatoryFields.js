const express = require("express");
const router = express.Router();
const eventTypeMandatoryFieldsController = require("../controller/eventTypeMandatoryFieldsController");

// -- Routes
router.post('/newEventTypeMandatoryField', eventTypeMandatoryFieldsController.newEventTypeMandatoryField);
router.get('/getEventTypeMandatoryFields', eventTypeMandatoryFieldsController.getEventTypeMandatoryFields);
router.delete('/deleteEventTypeMandatoryField', eventTypeMandatoryFieldsController.deleteEventTypeMandatoryField);
router.put('/updateEventTypeMandatoryField', eventTypeMandatoryFieldsController.updateEventTypeMandatoryField);
router.get('/getEventTypeMandatoryFieldById', eventTypeMandatoryFieldsController.getEventTypeMandatoryFieldById);

module.exports = router;