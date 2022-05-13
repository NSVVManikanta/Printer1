const printerGroupAssignConstroller = require("../controllers/printerGroupAssignmentController")
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
      const result = await printerGroupAssignConstroller.assignPrinterGroup(
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

  const unassignPrinterGroupReqHandler = async (req, res) => {
    try {
    //   if (!Object.keys(req.body).length) {
    //     throw errConstant.CONST_BAD_REQUEST_ERROR;
    //   }
      const result = await printerGroupAssignConstroller.unAssignPrinterGroup(
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

  module.exports = {assignPrinterGroupReqHandler,unassignPrinterGroupReqHandler}