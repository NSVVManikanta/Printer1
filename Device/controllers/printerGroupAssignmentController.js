const Model = require('../../util/database');
const errConstant = require("../../printerGroup/errors/printerGroupErrors");


<<<<<<< HEAD
//Assign Printer Groups 
const assignPrinterGroups = async (printerGroupArr, printerId) => {
    try {
        if (!Array.isArray(printerGroupArr)) {
            throw errConstant.CONST_PRINTERGROUPID_NOTARRAY;
        }
        if (isNaN(printerId)) {
            throw errConstant.CONST_ERROR_INT_PRINTERID;
        }
=======
const assignPrinterGroups = async (printerGroupArr, printerId) => {
    try {
>>>>>>> 1526618f52fdc925ab871238393d8852ab76a64b
        const findPrinterGroups = await Model.PrinterGroupAssignment.findAll({ where: { printerId: printerId } });
        const printerGroupDetails = findPrinterGroups.map((id) => {
            return id.printerGroupId;
        })
<<<<<<< HEAD
        console.log(printerGroupDetails);
        const arr = [];
        printerGroupArr.map((printerGroupId) => {
=======
        console.log( printerGroupDetails);
        const arr = [];
        const printerGroupsCompare = printerGroupArr.map((printerGroupId) => {
>>>>>>> 1526618f52fdc925ab871238393d8852ab76a64b
            const printerGroups = printerGroupDetails.includes(printerGroupId);
            if (!printerGroups) {
                arr.push(printerGroupId);
            }
        })
<<<<<<< HEAD
        console.log(arr)
        const assignmentArrObj = arr.map((id) => {
            return { printerGroupId: id ,
                printerId : printerId,
                assignedBy : 1};
        })
        console.log(assignmentArrObj)
        if (assignmentArrObj.length) {
            await Model.PrinterGroupAssignment.bulkCreate(assignmentArrObj);
            return { printerGroupId: printerGroupArr };
        }
        if (!arr.length) {
            console.log("assigned!")
            return { printerGroupId: printerGroupArr };

        }
=======
        // const printerGroups = printerGroupArr.every(pg=>!printerGroupDetails.includes(pg));
        console.log(printerGroupsCompare);
        if(arr.length){
        const assignmentArrObj = printerGroupsCompare.map((assign) => {
            assign.printerId = printerId;
            assign.assignedBy = printerId;
            return assign;
        });
        console.log(assignmentArrObj);
         await Model.PrinterGroupAssignment.bulkCreate(assignmentArrObj);
        return [{printerGroupId :printerGroupArr.PrinterGroupId}];
    }
    if(!arr.length){
        return [{printerGroupId :printerGroupArr.PrinterGroupId}];
    }
>>>>>>> 1526618f52fdc925ab871238393d8852ab76a64b
    } catch (err) {
        console.log(err);
        throw err;
    }
};

<<<<<<< HEAD
//Un Assign Printer Groups
=======
>>>>>>> 1526618f52fdc925ab871238393d8852ab76a64b
const unAssignPrinterGroups = async (printerGroupId, printerId) => {
    try {
        if (!Array.isArray(printerGroupId)) {
            throw errConstant.CONST_PRINTERGROUPID_NOTARRAY;
        } 
        if (isNaN(printerId)) {
            throw errConstant.CONST_ERROR_INT_PRINTERID;
        }
        const validateId = await Model.PrinterGroupAssignment.findAll({
            where: {
                [Model.Op.and]: [
                    { printerGroupId: printerGroupId },
                    { printerId: printerId }
                ]
            }
        });
<<<<<<< HEAD
        if(validateId.length == printerGroupId.length){
        await Model.PrinterGroupAssignment.destroy({
            where: {
                [Model.Op.and]: [
                    { printerGroupId: printerGroupId },
                    { printerId: printerId }
                ]
            }
        });
        return { PrinterGroupids: printerGroupId };
    }else{
        throw errConstant.CONST_INVALID_ID
    };
=======
        return [{ id: printerGroupId }];
>>>>>>> 1526618f52fdc925ab871238393d8852ab76a64b
    } catch (err) {
        console.log(err);
        throw err;
    }
};

<<<<<<< HEAD
// Assign One Printer Group
const assignOnePrinterGroup = async (params) => {
    try {
        if (isNaN(params.printerGroupId)) {
            throw errConstant.CONST_ERROR_INT_PRINTERGROUPID;
        } 
        if (isNaN(params.printerId)) {
            throw errConstant.CONST_ERROR_INT_PRINTERID;
        }
        const validateId = await Model.PrinterGroupAssignment.findOne({
            where: {
                [Model.Op.and]: [
                    { printerGroupId: params.printerGroupId },
                    { printerId: params.printerId }
                ]
            }
        });
        if(!validateId){
        const printerGroupAssignment = await Model.PrinterGroupAssignment.create({
            printerGroupId: params.printerGroupId,
            printerId: params.printerId,
            assignedBy: 1,
        });
        return { printerGroupId: printerGroupAssignment.printerGroupId };
            
    }else{
        console.log("assigned!")
        return { printerGroupId: params.printerGroupId };
    }
=======
const assignOnePrinterGroup = async (id) => {
    try {
        const printerGroupAssignment = await Model.PrinterGroupAssignment.create({
            printerGroupId: id.printerGroupId,
            printerId: id.printerId,
            assignedBy: id.printerId,
        });
        return {
        id: printerGroupAssignment.id,
        printerGroupId: printerGroupAssignment.PrinterGroupId,
        printerId: printerGroupAssignment.printerId,
        assignedAt: printerGroupAssignment.assignedAt,
        assignedBy: printerGroupAssignment.assignedBy,
        }
>>>>>>> 1526618f52fdc925ab871238393d8852ab76a64b
    } catch (err) {
        console.log(err);
        throw err;
    }
};

<<<<<<< HEAD

//UnAssign One Printer Group
const unAssignOnePrinterGroup = async (params) => {
    try {
        if (isNaN(params.printerGroupId)) {
            throw errConstant.CONST_ERROR_INT_PRINTERGROUPID;
        } 
        if (isNaN(params.printerId)) {
            throw errConstant.CONST_ERROR_INT_PRINTERID;
        }
        const validateId = await Model.PrinterGroupAssignment.findOne({
            where: {
                [Model.Op.and]: [
                    { printerGroupId: params.printerGroupId },
                    { printerId: params.printerId }
                ]
            }
        });
        if (!validateId) {
            throw errConstant.CONST_INVALID_ID
        }

        await validateId.destroy();
        return { printerGroupId: params.printerGroupId };
=======
const unAssignOnePrinterGroup = async (printerGroupId, printerId) => {
    try {
        await Model.PrinterGroupAssignment.destroy({
            where: {
                [Model.Op.and]: [
                    { printerGroupId: printerGroupId },
                    { printerId: printerId }
                ]
            }
        });
        return { id: printerGroupId };
>>>>>>> 1526618f52fdc925ab871238393d8852ab76a64b
    } catch (err) {
        console.log(err);
        throw err;
    }
};

<<<<<<< HEAD
module.exports = { assignPrinterGroups, unAssignPrinterGroups, assignOnePrinterGroup, unAssignOnePrinterGroup }
=======
module.exports = { assignPrinterGroups, unAssignPrinterGroups, assignOnePrinterGroup, unAssignOnePrinterGroup }
>>>>>>> 1526618f52fdc925ab871238393d8852ab76a64b
