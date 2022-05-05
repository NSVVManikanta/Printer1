const printerGroupController = require("../controllers/printerGroupControllers");
const errConstant = require("../errors/printerGroupErrors");
const db = require("../../util/database");
const status = require('http-status');


const createPrinterGroupsReqHandler = async (req, res) => {
  try {
    const result = await printerGroupController.createPrinterGroups(
      req.body.title,
      req.body.description,
      req.body.printType,
      req.body.activeStatus,
      req.body.triggers
    );
    res.status(status.CREATED).send(result);
  } catch (err) {
    switch (err) {
      case errConstant.CONST_BAD_REQUEST_ERROR:
        res.status(status.BAD_REQUEST).send(errConstant.CONST_BAD_REQUEST_ERROR);
        break;
      case errConstant.CONST_TRIGGERS_NOTARRAY:
        res.status(status.NOT_FOUND).send(errConstant.CONST_TRIGGERS_NOTARRAY);
        break;  
      default:
        res.status(status.INTERNAL_SERVER_ERROR).send(errConstant.CONST_INTERNAL_SERVER_ERROR);
        break;
    }
  }
};

const printerGroupsListReqHandler = async (req, res) => {
  try {
    const result = await printerGroupController.printerGroupsList();
    res.status(status.OK).send(result);
  } catch (err) {
    switch (err) {
      case errConstant.CONST_BAD_REQUEST_ERROR:
        res.status(status.BAD_REQUEST).send(errConstant.CONST_BAD_REQUEST_ERROR);
        break;
      case errConstant.CONST_ERROR_PRINTERGROUPLIST:
        res.status(status.NO_CONTENT).send(errConstant.CONST_ERROR_PRINTERGROUPLIST);
        break;    
      default:
        res.status(status.INTERNAL_SERVER_ERROR).send(errConstant.CONST_INTERNAL_SERVER_ERROR);
        break;
    }
  }
};

const updatePrinterGroupsReqHandler = async (req, res) => {
  try {
    const result = await printerGroupController.updatePrinterGroups(
      req.body.title,
      req.body.description,
      req.body.printType,
      req.params.printerGroupId,
    );
    res.status(status.OK).send(result);
  } catch (err) {
    switch (err) {
      case errConstant.CONST_BAD_REQUEST_ERROR:
        res.status(status.BAD_REQUEST).send(errConstant.CONST_BAD_REQUEST_ERROR);
        break;
      case errConstant.CONST_ERROR_INT_PRINTERGROUPID:
        res.status(status.NOT_FOUND).send(errConstant.CONST_ERROR_INT_PRINTERGROUPID);
        break; 
      case errConstant.CONST_INVALID_PRINTERID:
        res.status(status.NOT_FOUND).send(errConstant.CONST_INVALID_PRINTERID);
        break;  
      default:
        res.status(status.INTERNAL_SERVER_ERROR).send(errConstant.CONST_INTERNAL_SERVER_ERROR);
        break;
    }
  }
};

const updatePrinterGroupTriggersReqHandler = async (req, res) => {
  try {
    const result = await printerGroupController.updatePrinterGroupTriggers(
      req.body.trigger,
      req.body.orderType,
      req.params.printerGroupTriggerId,
    );
    res.status(status.OK).send(result);
  } catch (err) {
    switch (err) {
      case errConstant.CONST_BAD_REQUEST_ERROR:
        res.status(400).send(errConstant.CONST_BAD_REQUEST_ERROR);
        break;
      case errConstant.CONST_ERROR_INT_PRINTERGROUPTRIGGERID:
        res.status(404).send(errConstant.CONST_ERROR_INT_PRINTERGROUPTRIGGERID);
        break;  
      case errConstant.CONST_INVALID_TRIGGERID:
        res.status(404).send(errConstant.CONST_INVALID_TRIGGERID);
        break;
      default:
        res.status(500).send(errConstant.CONST_INTERNAL_SERVER_ERROR);
        break;
    }
  }
};

module.exports = {
  createPrinterGroupsReqHandler,
  printerGroupsListReqHandler,
  updatePrinterGroupsReqHandler,
  updatePrinterGroupTriggersReqHandler,
};
