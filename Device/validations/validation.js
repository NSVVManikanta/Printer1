const Joi = require("joi");
const errConstant = require("../../printerGroup/errors/printerGroupErrors");
const status = require("http-status");
const commonHelper = require("../../Helper");
const formatResponse = commonHelper.formatResponse;

//Assign PrinterGroups validations
const assignPrinterGroupsSchema = Joi.object({
    printerGroupId: Joi.array().items(
        Joi.number().positive().greater(0).required().messages({
            'number.base': 'printerGroupId must be an integer!',
            'number.positive': 'printerGroupId must be an positive number!',
            'number.greater': 'printerGroupId must be greater than zero!'
        }),
    ),
    printerId: Joi.number().positive().greater(0).required().messages({
        'number.base': 'printerId must be an integer!',
        'number.positive': 'printerId must be an positive number!',
        'number.greater': 'printerId must be greater than zero!'
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
        Joi.number().positive().greater(0).required().messages({
            'number.base': 'printerGroupId must be an integer!',
            'number.positive': 'printerGroupId must be an positive number!',
            'number.greater': 'printerGroupId must be greater than zero!'
        }),
    ),
    printerId: Joi.number().positive().greater(0).required().messages({
        'number.base': 'printerId must be an integer!',
        'number.positive': 'printerId must be an positive number!',
        'number.greater': 'printerId must be greater than zero!'
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
    printerGroupId: Joi.number().positive().greater(0).required().messages({
        'number.base': 'printerGroupId must be an integer!',
        'number.positive': 'printerGroupId must be an positive number!',
        'number.greater': 'printerGroupId must be greater than zero!'
    }),
    printerId: Joi.number().positive().greater(0).required().messages({
        'number.base': 'printerId must be an integer!',
        'number.positive': 'printerId must be an positive number!',
        'number.greater': 'printerId must be greater than zero!'
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
    printerGroupId: Joi.number().positive().greater(0).required().messages({
        'number.base': 'printerGroupId must be an integer!',
        'number.positive': 'printerGroupId must be an positive number!',
        'number.greater': 'printerGroupId must be greater than zero!'
    }),
    printerId: Joi.number().positive().greater(0).required().messages({
        'number.base': 'printerId must be an integer!',
        'number.positive': 'printerId must be an positive number!',
        'number.greater': 'printerId must be greater than zero!'
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