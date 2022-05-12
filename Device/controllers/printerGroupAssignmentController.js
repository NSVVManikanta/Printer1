const Model = require('../../util/database');


const assignPrinterGroup = async (Assign,printerId) => {
    try {
        //   if (!Array.isArray(postData.triggers)) {
        //     throw errConstant.CONST_TRIGGERS_NOTARRAY;
        //   } else {
        const assignmentArrObj = Assign.map((assign) => {
            assign.printerId = printerId;
            return assign;
        });
        console.log(assignmentArrObj);
        const printerGroupAssignment = await Model.PrinterGroupAssignment.bulkCreate(assignmentArrObj);
        //   }
        return {
            id: printerGroupAssignment.id,
            printerGroupId: printerGroupAssignment.printerGroupId,
            printerId: printerGroupAssignment.printerId,
            AssignedAt: printerGroupAssignment.AssignedAt,
            AssignedBy: printerGroupAssignment.id
        };
    } catch (err) {
        throw err;
    }
};

const unAssignPrinterGroup = async (Assign) => {
    try {
        // let toBeDeleted = await Model.PrinterGroupAssignment.findAll({
        //     where: {
        //         printerId: printerId
        //     }
        // });

        const toBeDeletedIds = Assign.map(unAssign => unAssign.printerGroupId);

        await Model.PrinterGroupAssignment.destroy({
            where: {
                [Op.and]: {
                    printerGroupId: toBeDeletedIds,
                }
            }
        })

        return "Deleted Successfully"
    } catch (err) {
        await t.rollback();
        throw err;
    }
};


module.exports = { assignPrinterGroup, unAssignPrinterGroup }