const express = require("express");
const app = express();
app.use(express.json());
const deviceController = require('../controllers/deviceController');
const printerController = require('../controllers/printerController')
const printerGroupAssignmentAPIController = require('../apiControllers/printerGroupAssignmentAPIController')
const validation = require("../validations/validation");



app.post('/printer', deviceController.createDevice, printerController.createPrinter)

app.post('/printer/:printerId/assign/printerGroups',validation.assignPrinterGroups, printerGroupAssignmentAPIController.assignPrinterGroupReqHandler);

app.put('/printer/:printerId/unAssign/printerGroups',validation.unAssignPrinterGroups, printerGroupAssignmentAPIController.unAssignPrinterGroupReqHandler);

app.post('/printer/:printerId/assign/printerGroup/:printerGroupId',validation.assignOnePrinterGroup, printerGroupAssignmentAPIController.assignOnePrinterGroupReqHandler);

app.delete('/printer/:printerId/unAssign/printerGroup/:printerGroupId',validation.unAssignOnePrinterGroup, printerGroupAssignmentAPIController.unAssignOnePrinterGroupReqHandler);



module.exports = app
