const Joi = require("joi");

//Create PrinterGroup validations
const schema = Joi.object({
  title: Joi.string().min(2).max(250).required(),
  description: Joi.string().required(),
  printType: Joi.number().integer().valid(1, 2),
  activeStatus: Joi.boolean().required(),
  triggers: Joi.array().items(
    Joi.object({
      trigger: Joi.number().integer().valid(1, 2, 3),
      orderType: Joi.number().integer().valid(1, 2),
    })
  ),
});
function createPrinterGroups(req, res, next) {
  const dataToValidate = {
    title: req.body.title,
    description: req.body.description,
    printType: req.body.printType,
    activeStatus: req.body.activeStatus,
    triggers: req.body.triggers,
  };
  const schemaerr = schema.validate(dataToValidate);
  if (schemaerr.error) {
    return res.status(400).send(schemaerr.error.message);
  }
  next();
}

// printer group list
const schema3 = Joi.object({
  status: Joi.number().integer().valid(0, 1),
});
function printerGrouplist(req, res, next) {
  const dataToValidate1 = {
    status: req.query.status,
  };
  if (req.query.status) {
    const schemaerr1 = schema3.validate(dataToValidate1);
    if (schemaerr1.error) {
      return res.status(400).send(schemaerr1.error.message);
    }
  }
  next();
}

// Fetch PrinterGroup Details
const schema4 = Joi.object({
  printerGroupId: Joi.number().integer().required(),
});
function fetchPrinterGroupDetails(req, res, next) {
  const dataToValidate1 = {
    printerGroupId: req.params.printerGroupId,
  };
  const schemaerr1 = schema4.validate(dataToValidate1);
  if (schemaerr1.error) {
    return res.status(400).send(schemaerr1.error.message);
  }
  next();
}

//Update PrinterGoup validations
const schema1 = Joi.object({
  printerGroupId: Joi.number().integer().required(),
  title: Joi.string().min(2).max(250),
  description: Joi.string(),
  printType: Joi.number().integer().valid(1, 2),
  activeStatus: Joi.boolean(),
});
function updatePrinterGroups(req, res, next) {
  const dataToValidate1 = {
    printerGroupId: req.params.printerGroupId,
    title: req.body.title,
    description: req.body.description,
    printType: req.body.printType,
    activeStatus: req.body.activeStatus,
  };
  const schemaerr1 = schema1.validate(dataToValidate1);
  if (schemaerr1.error) {
    return res.status(400).send(schemaerr1.error.message);
  }
  next();
}

//Update PrinterGrouptrigger validations
const schema2 = Joi.object({
  printerGroupTriggerId: Joi.number().integer().required(),
  trigger: Joi.number().integer().valid(1, 2, 3),
  orderType: Joi.number().integer().valid(1, 2),
});
function updatePrinterGroupTriggers(req, res, next) {
  const dataToValidate2 = {
    printerGroupTriggerId: req.params.printerGroupTriggerId,
    trigger: req.body.trigger,
    orderType: req.body.orderType,
  };
  const schemaerr2 = schema2.validate(dataToValidate2);
  if (schemaerr2.error) {
    return res.status(400).send(schemaerr2.error.message);
  }
  next();
}

module.exports = {
  createPrinterGroups,
  updatePrinterGroups,
  fetchPrinterGroupDetails,
  printerGrouplist,
  updatePrinterGroupTriggers,
};
