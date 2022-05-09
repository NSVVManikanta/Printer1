const express = require("express");
const app = express();

const printerControllerRegHandler = require("../apiControllers/printerGroupAPIController");
const validation = require("../validations/validation");

app.use(express.json());

//Create Printer Group
app.post(
  "/",
  validation.createPrinterGroups,
  printerControllerRegHandler.createPrinterGroupsReqHandler
);

//PrinterGroup List
app.get(
  "/",
  validation.printerGrouplist,
  printerControllerRegHandler.printerGroupsListReqHandler
);

//Fetch One PrinterGroup List
app.get(
  "/:printerGroupId",
  validation.fetchPrinterGroupDetails,
  printerControllerRegHandler.fetchOnePrinterGroupsListReqHandler
);

//Update PrinterGroup
app.put(
  "/:printerGroupId",
  validation.updatePrinterGroups,
  printerControllerRegHandler.updatePrinterGroupsReqHandler
);

//update printeGroupTrigger
app.put(
  "/trigger/:printerGroupTriggerId",
  validation.updatePrinterGroupTriggers,
  printerControllerRegHandler.updatePrinterGroupTriggersReqHandler
);

module.exports = app;
