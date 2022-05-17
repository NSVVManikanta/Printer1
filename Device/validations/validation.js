const Joi = require("joi");
const errConstant = require("../../printerGroup/errors/printerGroupErrors");
const status = require("http-status");
const commonHelper = require("../../Helper");
const formatResponse = commonHelper.formatResponse;

//Assign PrinterGroups validations
const assignPrinterGroupsSchema = Joi.object({
    printerGroupId: Joi.array().items(
        Joi.number().integer().required().messages({
            'number.base': 'printerGroupId must be an integer!',
        }),
    ),
    printerId: Joi.number().integer().required().messages({
        'number.base': ' printerId must be an integer!',
    }),
});
function assignPrinterGroups(req, res, next) {
    try {
        const dataToValidate = {
            printerGroupId: req.body.printerGroupId,
            printerId: req.params.printerId,
        };
        const options = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true
        }
        const schemaerr = assignPrinterGroupsSchema.validate(dataToValidate, options);
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

//UnAssign PrinterGroups validations
const unAssignPrinterGroupsSchema = Joi.object({
    printerGroupId: Joi.array().items(
        Joi.number().integer().required().messages({
            'number.base': 'printerGroupId must be an integer!',
        }),
    ),
    printerId: Joi.number().integer().required().messages({
        'number.base': ' printerId must be an integer!',
    }),
});
function unAssignPrinterGroups(req, res, next) {
    try {
        const dataToValidate = {
            printerGroupId: req.body.printerGroupId,
            printerId: req.params.printerId,
        };
        const options = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true
        }
        const schemaerr1 = unAssignPrinterGroupsSchema.validate(dataToValidate, options);
        if (schemaerr1.error) {
            return res.status(400).send(schemaerr1.error.message);
        }
        next();
    } catch (err) {
        res
            .status(status.INTERNAL_SERVER_ERROR)
            .send(formatResponse(errConstant.CONST_INTERNAL_SERVER_ERROR));
    }
}

//Assign One PrinterGroup validations
const assignPrinterGroupSchema = Joi.object({
    printerGroupId: Joi.number().required().messages({
        'number.base': 'printerGroupId must be an integer!',
    }),
    printerId: Joi.number().required().messages({
        'number.base': ' printerId must be an integer!',
    }),
});
function assignOnePrinterGroup(req, res, next) {
    try {
        const dataToValidate = {
            printerGroupId: req.params.printerGroupId,
            printerId: req.params.printerId,
        };
        const options = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true
        }
        const schemaerr2 = assignPrinterGroupSchema.validate(dataToValidate, options);
        if (schemaerr2.error) {
            return res.status(400).send(schemaerr2.error.message);
        }
        next();
    } catch (err) {
        res
            .status(status.INTERNAL_SERVER_ERROR)
            .send(formatResponse(errConstant.CONST_INTERNAL_SERVER_ERROR));
    }
}

//UAssign One PrinterGroup validations
const unAssignPrinterGroup = Joi.object({
    printerGroupId: Joi.number().integer().min(1).max(250).required().messages({
        'number.base': 'printerGroupId must be an integer!',
    }),
    printerId: Joi.number().integer().min(1).max(250).required().messages({
        'number.base': ' printerId must be an integer!',
    }),
});
function unAssignOnePrinterGroup(req, res, next) {
    try {
        const dataToValidate = {
            printerGroupId: req.params.printerGroupId,
            printerId: req.params.printerId,
        };
        const options = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true
        }
        const schemaerr2 = unAssignPrinterGroup.validate(dataToValidate, options);
        if (schemaerr2.error) {
            return res.status(400).send(schemaerr2.error.message);
        }
        next();
    } catch (err) {
        res
            .status(status.INTERNAL_SERVER_ERROR)
            .send(formatResponse(errConstant.CONST_INTERNAL_SERVER_ERROR));
    }
}

module.exports = {
    assignPrinterGroups,
    unAssignPrinterGroups,
    assignOnePrinterGroup,
    unAssignOnePrinterGroup,
};