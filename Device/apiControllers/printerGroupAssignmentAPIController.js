const printerGroupAssignController = require("../controllers/printerGroupAssignmentController")
const status = require("http-status");
const commonHelper = require('../../Helper');
const errConstant = require('../../printerGroup/errors/printerGroupErrors')
const formatResponse = commonHelper.formatResponse;
const successResponse = commonHelper.successResponse;


const assignPrinterGroupReqHandler = async (req, res) => {
  try {
    //   if (!Object.keys(req.body).length) {
    //     throw errConstant.CONST_BAD_REQUEST_ERROR;
    //   }
    const result = await printerGroupAssignController.assignPrinterGroups(
      req.body.printerGroupId,
      req.params.printerId,
    );
    res.status(status.CREATED).send(successResponse(result));
  } catch (err) {
    //   switch (err) {
    //     case errConstant.CONST_BAD_REQUEST_ERROR:
    //       res
    //         .status(status.BAD_REQUEST)
    //         .send(formatResponse(errConstant.CONST_BAD_REQUEST_ERROR));
    //       break;
    //     case errConstant.CONST_TRIGGERS_NOTARRAY:
    //       res
    //         .status(status.BAD_REQUEST)
    //         .send(formatResponse(errConstant.CONST_TRIGGERS_NOTARRAY));
    //       break;
    //     default:
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .send(formatResponse(errConstant.CONST_INTERNAL_SERVER_ERROR));
    //   break;
  }
  // }
};

const unAssignPrinterGroupReqHandler = async (req, res) => {
  try {
    //   if (!Object.keys(req.body).length) {
    //     throw errConstant.CONST_BAD_REQUEST_ERROR;
    //   }
    const result = await printerGroupAssignController.unAssignPrinterGroups(
      req.body.printerGroupId,
      req.params.printerId,
    );
    res.status(status.CREATED).send(successResponse(result));
  } catch (err) {
    //   switch (err) {
    //     case errConstant.CONST_BAD_REQUEST_ERROR:
    //       res
    //         .status(status.BAD_REQUEST)
    //         .send(formatResponse(errConstant.CONST_BAD_REQUEST_ERROR));
    //       break;
    //     case errConstant.CONST_TRIGGERS_NOTARRAY:
    //       res
    //         .status(status.BAD_REQUEST)
    //         .send(formatResponse(errConstant.CONST_TRIGGERS_NOTARRAY));
    //       break;
    //     default:
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .send(formatResponse(errConstant.CONST_INTERNAL_SERVER_ERROR));
    //   break;
  }
  // }
};

const assignOnePrinterGroupReqHandler = async (req, res) => {
  try {
    //   if (!Object.keys(req.body).length) {
    //     throw errConstant.CONST_BAD_REQUEST_ERROR;
    //   }
    const result = await printerGroupAssignController.assignOnePrinterGroup(
      req.params,
    );
    res.status(status.CREATED).send(successResponse(result));
  } catch (err) {
    //   switch (err) {
    //     case errConstant.CONST_BAD_REQUEST_ERROR:
    //       res
    //         .status(status.BAD_REQUEST)
    //         .send(formatResponse(errConstant.CONST_BAD_REQUEST_ERROR));
    //       break;
    //     case errConstant.CONST_TRIGGERS_NOTARRAY:
    //       res
    //         .status(status.BAD_REQUEST)
    //         .send(formatResponse(errConstant.CONST_TRIGGERS_NOTARRAY));
    //       break;
    //     default:
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .send(formatResponse(errConstant.CONST_INTERNAL_SERVER_ERROR));
    //   break;
  }
  // }
};

const unAssignOnePrinterGroupReqHandler = async (req, res) => {
  try {
    //   if (!Object.keys(req.body).length) {
    //     throw errConstant.CONST_BAD_REQUEST_ERROR;
    //   }
    const result = await printerGroupAssignController.unAssignOnePrinterGroup(
      req.params,
    );
    res.status(status.CREATED).send(successResponse(result));
  } catch (err) {
    //   switch (err) {
    //     case errConstant.CONST_BAD_REQUEST_ERROR:
    //       res
    //         .status(status.BAD_REQUEST)
    //         .send(formatResponse(errConstant.CONST_BAD_REQUEST_ERROR));
    //       break;
    //     case errConstant.CONST_TRIGGERS_NOTARRAY:
    //       res
    //         .status(status.BAD_REQUEST)
    //         .send(formatResponse(errConstant.CONST_TRIGGERS_NOTARRAY));
    //       break;
    //     default:
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .send(formatResponse(errConstant.CONST_INTERNAL_SERVER_ERROR));
    //   break;
  }
  // }
};





module.exports = { assignPrinterGroupReqHandler, unAssignPrinterGroupReqHandler, assignOnePrinterGroupReqHandler, unAssignOnePrinterGroupReqHandler };
