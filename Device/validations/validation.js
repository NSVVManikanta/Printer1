const Joi = require("joi");
const errConstant = require("../errors/printerGroupErrors");
const status = require("http-status");
const commonHelper = require("../../Helper");
const formatResponse = commonHelper.formatResponse;

//Create PrinterGroup validations
const schema = Joi.array().items(
    Joi.object({
      printerGroupId: Joi.number().integer().min(1).manx(250).required().messages({
        'number.base': 'printerGroupId must be an integer!'
      })
    })
  );
function assignPrinterGroupReqHandler(req, res, next) {
  try {
    const dataToValidate = {
      title: req.body.title,
      description: req.body.description,
      printType: req.body.printType,
      triggers: req.body.triggers,
    };
    const options = {
      abortEarly: false, 
      allowUnknown: true,
      stripUnknown: true 
    }
    const schemaerr = schema.validate(dataToValidate,options);
    if (schemaerr.error) {
      return res.status(400).send(schemaerr.error.message);
    }
    next();
  } catch (err) {
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .send(formatResponse(errConstant.CONST_INTERNAL_SERVER_ERROR));
  }
}

// // printer group list
// const schema3 = Joi.object({
//   status: Joi.number().integer().valid(0, 1).required().messages({
//     'number.base': 'status must be an integer!'
//   }),
// });

// //Update PrinterGoup validations
// const schema1 = Joi.object({
//   printerGroupId: Joi.number().integer().required(),
//   title: Joi.string().min(2).max(250).messages({
//     'string.empty': 'title cannot be empty!',
//     'string.min': 'title minimum 2 character required',
//     'string.max':'title maximum 250 characters allowed'
//   }),
//   description: Joi.string(),
//   printType: Joi.number().integer().valid(1, 2).messages({
//     'number.base': 'printType must be an integer!'
//   }),
// });
// function unAssignPrinterGroupReqHandler(req, res, next) {
//   try {
//     const dataToValidate1 = {
//       printerGroupId: req.params.printerGroupId,
//       title: req.body.title,
//       description: req.body.description,
//       printType: req.body.printType,
//     };
//     const options = {
//       abortEarly: false,
//       allowUnknown: true,
//       stripUnknown: true  
//     }
//     const schemaerr1 = schema1.validate(dataToValidate1,options);
//     if (schemaerr1.error) {
//       return res.status(400).send(schemaerr1.error.message);
//     }
//     next();
//   } catch (err) {
//     res
//       .status(status.INTERNAL_SERVER_ERROR)
//       .send(formatResponse(errConstant.CONST_INTERNAL_SERVER_ERROR));
//   }
// }

// //Update PrinterGrouptrigger validations
// const schema2 = Joi.object({
//   printerGroupTriggerId: Joi.number().integer().required().messages({
//     'number.base': 'printerGroupTriggerId must be an integer!'
//   }),
//   trigger: Joi.number().integer().valid(1, 2, 3).messages({
//     'number.base': 'trigger must be an integer!'
//   }),
//   orderType: Joi.number().integer().valid(1, 2).messages({
//     'number.base': 'orderType must be an integer!'
//   }),
// });
// function assignOnePrinterGroupReqHandler(req, res, next) {
//   try {
//     const dataToValidate2 = {
//       printerGroupTriggerId: req.params.printerGroupTriggerId,
//       trigger: req.body.trigger,
//       orderType: req.body.orderType,
//     };
//     const options = {
//       abortEarly: false,  
//       allowUnknown: true,
//       stripUnknown: true
//     }
//     const schemaerr2 = schema2.validate(dataToValidate2,options);
//     if (schemaerr2.error) {
//       return res.status(400).send(schemaerr2.error.message);
//     }
//     next();
//   } catch (err) {
//     res
//       .status(status.INTERNAL_SERVER_ERROR)
//       .send(formatResponse(errConstant.CONST_INTERNAL_SERVER_ERROR));
//   }
// }

// //Update PrinterGrouptrigger validations
// const schema2 = Joi.object({
//   printerGroupTriggerId: Joi.number().integer().required().messages({
//     'number.base': 'printerGroupTriggerId must be an integer!'
//   }),
//   trigger: Joi.number().integer().valid(1, 2, 3).messages({
//     'number.base': 'trigger must be an integer!'
//   }),
//   orderType: Joi.number().integer().valid(1, 2).messages({
//     'number.base': 'orderType must be an integer!'
//   }),
// });
// function unAssignOnePrinterGroupReqHandler(req, res, next) {
//   try {
//     const dataToValidate2 = {
//       printerGroupTriggerId: req.params.printerGroupTriggerId,
//       trigger: req.body.trigger,
//       orderType: req.body.orderType,
//     };
//     const options = {
//       abortEarly: false,  
//       allowUnknown: true,
//       stripUnknown: true
//     }
//     const schemaerr2 = schema2.validate(dataToValidate2,options);
//     if (schemaerr2.error) {
//       return res.status(400).send(schemaerr2.error.message);
//     }
//     next();
//   } catch (err) {
//     res
//       .status(status.INTERNAL_SERVER_ERROR)
//       .send(formatResponse(errConstant.CONST_INTERNAL_SERVER_ERROR));
//   }
// }

// module.exports = {
//   createPrinterGroups,
//   updatePrinterGroups,
//   fetchPrinterGroupDetails,
//   printerGrouplist,
//   updatePrinterGroupTriggers,
// };
