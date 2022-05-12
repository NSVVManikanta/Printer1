const express = require("express");
const app = express();
app.use(express.json());
const deviceController = require('../controllers/deviceController');
const printerController = require('../controllers/printerController')
const printerGroupAssignmentAPIController = require('../apiControllers/printerGroupAssignmentAPIController')


app.post('/printer', deviceController.createDevice, printerController.createPrinter)

app.post('/assign/:printerId', printerGroupAssignmentAPIController.assignPrinterGroupReqHandler);

app.put('/unAssign/', printerGroupAssignmentAPIController.unassignPrinterGroupReqHandler);









module.exports = app
