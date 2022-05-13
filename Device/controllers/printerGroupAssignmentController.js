const Model = require('../../util/database');


const assignPrinterGroup = async (PrinterGroupId,printerId) => {
    try {
        //   if (!Array.isArray(Assign)) {
        //     throw errConstant.CONST_TRIGGERS_NOTARRAY;
        //   } else {
        const findPrinterGroups = await Model.PrinterGroupAssignment.findAll({where: {printerId:printerId}});
        const printerGroupArr = findPrinterGroups.map((id)=>{
            return id.printerGroupId;
        })
        console.log(printerGroupArr);
        const arr1=[];
        const notMatch =  PrinterGroupId.map((pgId)=>{
            const arr = printerGroupArr.includes(pgId);
            if(!arr){
               arr1.push(pgId);
            }
        })
        // const printerGroups = PrinterGroupId.every(pg=>!printerGroupArr.includes(pg));
        console.log(notMatch);
        const assignmentArrObj = notMatch.map((assign) => {
            assign.printerId = printerId;
            assign.assignedBy = printerId;
            return assign;
        });
       console.log(assignmentArrObj);
        const printerGroupAssignment = await Model.PrinterGroupAssignment.bulkCreate(assignmentArrObj);
        //   }
        return printerGroupAssignment;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const unAssignPrinterGroup = async (printerGroupId,printerId) => {
    try {
        // const toBeDeletedIds = printerGroupId.map(unAssign => {
        //     unAssign.printerGroupId
        // });
        await Model.PrinterGroupAssignment.destroy({
            where: {
                [ Model.Op.and]: [
                    {printerGroupId: printerGroupId},
                    {printerId:printerId}
            ]
            }
        });
        return  [{id:printerGroupId}];
    } catch (err) {
        console.log(err);
        throw err;
    }
};

module.exports = { assignPrinterGroup, unAssignPrinterGroup }