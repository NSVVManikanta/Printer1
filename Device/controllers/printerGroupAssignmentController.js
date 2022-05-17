const Model = require('../../util/database');
const errConstant = require("../../printerGroup/errors/printerGroupErrors");


//Assign Printer Groups 
const assignPrinterGroups = async (printerGroupArr, printerId) => {
    try {
        if (!Array.isArray(printerGroupArr)) {
            throw errConstant.CONST_PRINTERGROUPID_NOTARRAY;
        }
        if (isNaN(printerId)) {
            throw errConstant.CONST_ERROR_INT_PRINTERID;
        }
        const findPrinterGroups = await Model.PrinterGroupAssignment.findAll({ where: { printerId: printerId } });
        const printerGroupDetails = findPrinterGroups.map((id) => {
            return id.printerGroupId;
        })
        console.log(printerGroupDetails);
        const arr = [];
        printerGroupArr.map((printerGroupId) => {
            const printerGroups = printerGroupDetails.includes(printerGroupId);
            if (!printerGroups) {
                arr.push(printerGroupId);
            }
        })
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
    } catch (err) {
        console.log(err);
        throw err;
    }
};

//Un Assign Printer Groups
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
    } catch (err) {
        console.log(err);
        throw err;
    }
};

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
    } catch (err) {
        console.log(err);
        throw err;
    }
};


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
    } catch (err) {
        console.log(err);
        throw err;
    }
};

module.exports = { assignPrinterGroups, unAssignPrinterGroups, assignOnePrinterGroup, unAssignOnePrinterGroup }