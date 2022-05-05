const db = require("../../util/database");
const errConstant = require("../errors/printerGroupErrors");
const resConstant = require("../constants");

/**
 * create
 * @param {*} title
 * @param {*} description
 * @param {*} printType
 * @param {*} activeStatus
 * @param {*} triggers array
 * @param {*} trigger
 * @param {*} orderType
 * @returns
 */
//Create Printer Group
const createPrinterGroups = async (
  title,
  description,
  printType,
  activeStatus,
  triggers
) => {
  let t;
  try {
    t = await db.sequelize.transaction();
    const printer = await db.PrinterGroups.create(
      {
        title: title,
        description: description,
        printType: printType,
        activeStatus: activeStatus,
      },
      { transaction: t }
    );
    if (Array.isArray(triggers) == false) {
      throw errConstant.CONST_TRIGGERS_NOTARRAY;
    } else {
      const triggerArr = triggers;
      const printerGroupArrObj = triggerArr.map((trigger) => {
        trigger.printerGroupId = printer.id;
        return trigger;
      });
      console.log(printerGroupArrObj);
      await db.PrinterGroupTriggers.bulkCreate(printerGroupArrObj, {
        individualHooks: true,
        transaction: t,
      });
      await t.commit();
    }
    return {
      title: printer.title,
      description: printer.description,
      printType: printer.printType,
      activeStatus: printer.activeStatus,
    };
  } catch (err) {
    await t.rollback();
    console.log(err);
    throw err;
  }
};

/**
 * list
 * @param {*} req
 * @param {*} res
 * @returns
 */
//PrinterGroup List
const printerGroupsList = async () => {
  try {
    const printerList = await db.PrinterGroups.findAll({
      attributes: { exclude: ["createdBy", "updatedBy", "activeStatus"] },
      where: { activeStatus: true },
      include: [
        {
          model: db.PrinterGroupTriggers,
          attributes: { exclude: ["createdBy", "updatedBy"] },
        },
      ],
    });
    if (!printerList.length) {
      throw errConstant.CONST_ERROR_PRINTERGROUPLIST;
    } else {
      return printerList;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/**
 * update printergroup
 * @param {*} title
 * @param {*} description
 * @param {*} printType
 * @param {*} activeStatus
 * @returns String
 */
//Update PrinterGroup
const updatePrinterGroups = async (
  title,
  description,
  printType,
  printerGroupId
) => {
  try {
    if (isNaN(printerGroupId)) {
      throw errConstant.CONST_ERROR_INT_PRINTERGROUPID;
    }
    const check_pid = await db.PrinterGroups.findOne({
      where: { id: printerGroupId },
    });
    if (!check_pid) {
      throw errConstant.CONST_INVALID_PRINTERID;
    }
    await db.PrinterGroups.update(
      {
        title: title,
        description: description,
        printType: printType,
      },
      { where: { id: printerGroupId }, individualHooks: true }
    );
    return resConstant.UPDATE_PRINTER_GROUP_RESPONSE;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/**
 * update printertrigger
 * @param {*} trigger
 * @param {*} orderType
 * @returns string
 */
//update printeGroupTrigger
const updatePrinterGroupTriggers = async (
  trigger,
  orderType,
  printerGroupTriggerId
) => {
  try {
    if (isNaN(printerGroupTriggerId)) {
      throw errConstant.CONST_ERROR_INT_PRINTERGROUPTRIGGERID;
    }
    const check_tid = await db.PrinterGroupTriggers.findOne({
      where: { id: printerGroupTriggerId },
    });
    if (!check_tid) {
      throw errConstant.CONST_INVALID_TRIGGERID;
    }
    await db.PrinterGroupTriggers.update(
      {
        trigger: trigger,
        orderType: orderType,
      },
      { where: { id: printerGroupTriggerId }, individualHooks: true }
    );
    return resConstant.UPDATE_PRINTER_GROUP_TRIGGERS_RESPONSE;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
module.exports = {
  createPrinterGroups,
  printerGroupsList,
  updatePrinterGroups,
  updatePrinterGroupTriggers,
};
