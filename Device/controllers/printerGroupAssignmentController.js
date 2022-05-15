const Model = require('../../util/database');


const assignPrinterGroups = async (printerGroupArr, printerId) => {
    try {
        const findPrinterGroups = await Model.PrinterGroupAssignment.findAll({ where: { printerId: printerId } });
        const printerGroupDetails = findPrinterGroups.map((id) => {
            return id.printerGroupId;
        })
        console.log( printerGroupDetails);
        const arr = [];
        const printerGroupsCompare = printerGroupArr.map((printerGroupId) => {
            const printerGroups = printerGroupDetails.includes(printerGroupId);
            if (!printerGroups) {
                arr.push(printerGroupId);
            }
        })
        // const printerGroups = printerGroupArr.every(pg=>!printerGroupDetails.includes(pg));
        console.log(printerGroupsCompare);
        if(arr.length){
        const assignmentArrObj = printerGroupsCompare.map((assign) => {
            assign.printerId = printerId;
            assign.assignedBy = printerId;
            return assign;
        });
        console.log(assignmentArrObj);
        const printerGroupAssignment = await Model.PrinterGroupAssignment.bulkCreate(assignmentArrObj);
        return printerGroupAssignment;
    }
    if(!arr.length){
        return [{id:printerGroupArr}]
    }
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const unAssignPrinterGroups = async (printerGroupId, printerId) => {
    try {
        // const toBeDeletedIds = printerGroupId.map(unAssign => {
        //     unAssign.printerGroupId
        // });
        await Model.PrinterGroupAssignment.destroy({
            where: {
                [Model.Op.and]: [
                    { printerGroupId: printerGroupId },
                    { printerId: printerId }
                ]
            }
        });
        return [{ id: printerGroupId }];
    } catch (err) {
        console.log(err);
        throw err;
    }
};

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
    } catch (err) {
        console.log(err);
        throw err;
    }
};

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
    } catch (err) {
        console.log(err);
        throw err;
    }
};

module.exports = { assignPrinterGroups, unAssignPrinterGroups, assignOnePrinterGroup, unAssignOnePrinterGroup }
