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
    const printerGroup = await db.PrinterGroups.create(
      {
        title: title,
        description: description,
        printType: printType,
        activeStatus: activeStatus,
      },
      { transaction: t }
    );
    if (!Array.isArray(triggers)) {
      throw errConstant.CONST_TRIGGERS_NOTARRAY;
    } else {
      const printerGroupArrObj = triggers.map((trigger) => {
        trigger.printerGroupId = printerGroup.id;
        return trigger;
      });
      console.log(printerGroupArrObj);
      await db.PrinterGroupTriggers.bulkCreate(printerGroupArrObj, {
        transaction: t,
      });
      await t.commit();
    }
    return {
      title: printerGroup.title,
      description: printerGroup.description,
      printType: printerGroup.printType,
      activeStatus: printerGroup.activeStatus,
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
const printerGroupsList = async (status) => {
  try {
    let filters = {};
    if (status == 1) {
      filters.activeStatus = status;
    }
    if (status == 0) {
      filters.activeStatus = status;
    }
    const printerGroupList = await db.PrinterGroups.findAll({
      attributes: { exclude: ["createdBy", "updatedBy"] },
      where: filters,
    });
    if (!printerGroupList.length) {
      throw errConstant.CONST_ERROR_EMPTY_PRINTERGROUPLIST;
    } else {
      return printerGroupList;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//Fetch One PrinterGroup Details
const fetchPrinterGroupDetails = async (printerGroupId) => {
  try {
    if (isNaN(printerGroupId)) {
      throw errConstant.CONST_ERROR_INT_PRINTERGROUPID;
    }
    const printerGroupListDetails = await db.PrinterGroups.findOne({
      attributes: { exclude: ["createdBy", "updatedBy", "activeStatus"] },
      include: [
        {
          model: db.PrinterGroupTriggers,
          attributes: { exclude: ["createdBy", "updatedBy"] },
        },
      ],
      where: { id: printerGroupId },
    });
    if (!printerGroupListDetails) {
      throw errConstant.CONST_INVALID_PRINTERGROUPID;
    }
    return printerGroupListDetails;
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
    const printerGroup = await db.PrinterGroups.findOne({
      where: { id: printerGroupId },
    });
    if (!printerGroup) {
      throw errConstant.CONST_INVALID_PRINTERGROUPID;
    }
    await printerGroup.update(
      {
        title: title,
        description: description,
        printType: printType,
      },
      { where: { id: printerGroupId } }
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
    const printerGroupTrigger = await db.PrinterGroupTriggers.findOne({
      where: { id: printerGroupTriggerId },
    });
    if (!printerGroupTrigger) {
      throw errConstant.CONST_INVALID_PRINTERGROUPTRIGGERID;
    }
    await printerGroupTrigger.update(
      {
        trigger: trigger,
        orderType: orderType,
      },
      { where: { id: printerGroupTriggerId } }
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
  fetchPrinterGroupDetails,
};
