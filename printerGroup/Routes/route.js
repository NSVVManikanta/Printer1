const express = require("express");
const app = express();

const printerControllerRegHandler = require("../apiControllers/printerGroupAPIController");
const validation = require("../validations/validation");

app.use(express.json());

//Create Printer Group
app.post(
  "/PrinterGroups",
  validation.createPrinterGroups,
  printerControllerRegHandler.createPrinterGroupsReqHandler
);

//PrinterGroup List
app.get(
  "/PrinterGroupsList",
  printerControllerRegHandler.printerGroupsListReqHandler
);

//Update PrinterGroup
app.put(
  "/UpdatePrinterGroups/:printerGroupId",
  validation.updatePrinterGroups,
  printerControllerRegHandler.updatePrinterGroupsReqHandler
);

//update printeGroupTrigger
app.put(
  "/UpdatePrinterGroupTriggers/:printerGroupTriggerId",
  validation.updatePrinterGroupTriggers,
  printerControllerRegHandler.updatePrinterGroupTriggersReqHandler
);

module.exports = app;
