const printerGroupController = require("../controllers/printerGroupControllers");
const errConstant = require("../errors/printerGroupErrors");
const db = require("../../util/database");
const status = require("http-status");

const createPrinterGroupsReqHandler = async (req, res) => {
  try {
    if (!Object.keys(req.body).length) {
      throw errConstant.CONST_BAD_REQUEST_ERROR;
    }
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
        res
          .status(status.BAD_REQUEST)
          .send(errConstant.CONST_BAD_REQUEST_ERROR);
        break;
      case errConstant.CONST_TRIGGERS_NOTARRAY:
        res
          .status(status.BAD_REQUEST)
          .send(errConstant.CONST_TRIGGERS_NOTARRAY);
        break;
      default:
        res
          .status(status.INTERNAL_SERVER_ERROR)
          .send(errConstant.CONST_INTERNAL_SERVER_ERROR);
        break;
    }
  }
};

const fetchOnePrinterGroupsListReqHandler = async (req, res) => {
  try {
    const result = await printerGroupController.fetchPrinterGroupDetails(
      req.params.printerGroupId
    );
    res.status(status.OK).send(result);
  } catch (err) {
    switch (err) {
      case errConstant.CONST_ERROR_INT_PRINTERGROUPID:
        res
          .status(status.BAD_REQUEST)
          .send(errConstant.CONST_ERROR_INT_PRINTERGROUPID);
        break;
      case errConstant.CONST_INVALID_PRINTERGROUPID:
        res
          .status(status.NOT_FOUND)
          .send(errConstant.CONST_INVALID_PRINTERGROUPID);
        break;
      default:
        res
          .status(status.INTERNAL_SERVER_ERROR)
          .send(errConstant.CONST_INTERNAL_SERVER_ERROR);
        break;
    }
  }
};

const printerGroupsListReqHandler = async (req, res) => {
  try {
    const result = await printerGroupController.printerGroupsList(
      req.query.status
    );
    res.status(status.OK).send(result);
  } catch (err) {
    switch (err) {
      case errConstant.CONST_ERROR_EMPTY_PRINTERGROUPLIST:
        res
          .status(status.NO_CONTENT)
          .send(errConstant.CONST_ERROR_EMPTY_PRINTERGROUPLIST);
        break;
      default:
        res
          .status(status.INTERNAL_SERVER_ERROR)
          .send(errConstant.CONST_INTERNAL_SERVER_ERROR);
        break;
    }
  }
};

const updatePrinterGroupsReqHandler = async (req, res) => {
  try {
    if (!Object.keys(req.body).length) {
      throw errConstant.CONST_BAD_REQUEST_ERROR;
    }
    const result = await printerGroupController.updatePrinterGroups(
      req.body.title,
      req.body.description,
      req.body.printType,
      req.params.printerGroupId
    );
    res.status(status.OK).send(result);
  } catch (err) {
    switch (err) {
      case errConstant.CONST_BAD_REQUEST_ERROR:
        res
          .status(status.BAD_REQUEST)
          .send(errConstant.CONST_BAD_REQUEST_ERROR);
        break;
      case errConstant.CONST_ERROR_INT_PRINTERGROUPID:
        res
          .status(status.BAD_REQUEST)
          .send(errConstant.CONST_ERROR_INT_PRINTERGROUPID);
        break;
      case errConstant.CONST_INVALID_PRINTERGROUPID:
        res
          .status(status.NOT_FOUND)
          .send(errConstant.CONST_INVALID_PRINTERGROUPID);
        break;
      default:
        res
          .status(status.INTERNAL_SERVER_ERROR)
          .send(errConstant.CONST_INTERNAL_SERVER_ERROR);
        break;
    }
  }
};

const updatePrinterGroupTriggersReqHandler = async (req, res) => {
  try {
    if (!Object.keys(req.body).length) {
      throw errConstant.CONST_BAD_REQUEST_ERROR;
    }
    const result = await printerGroupController.updatePrinterGroupTriggers(
      req.body.trigger,
      req.body.orderType,
      req.params.printerGroupTriggerId
    );
    res.status(status.OK).send(result);
  } catch (err) {
    switch (err) {
      case errConstant.CONST_BAD_REQUEST_ERROR:
        res
          .status(status.BAD_REQUEST)
          .send(errConstant.CONST_BAD_REQUEST_ERROR);
        break;
      case errConstant.CONST_ERROR_INT_PRINTERGROUPTRIGGERID:
        res
          .status(status.BAD_REQUEST)
          .send(errConstant.CONST_ERROR_INT_PRINTERGROUPTRIGGERID);
        break;
      case errConstant.CONST_INVALID_PRINTERGROUPTRIGGERID:
        res
          .status(status.NOT_FOUND)
          .send(errConstant.CONST_INVALID_PRINTERGROUPTRIGGERID);
        break;
      default:
        res
          .status(status.INTERNAL_SERVER_ERROR)
          .send(errConstant.CONST_INTERNAL_SERVER_ERROR);
        break;
    }
  }
};

module.exports = {
  createPrinterGroupsReqHandler,
  printerGroupsListReqHandler,
  updatePrinterGroupsReqHandler,
  updatePrinterGroupTriggersReqHandler,
  fetchOnePrinterGroupsListReqHandler,
};
