const { Transaction } = require('sequelize');
var HttpStatus = require('http-status')
const Model = require('../../util/database');

const createPrinter = async (req, res) => {
    try {
        if (!req.deviceId) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR)
            return
        }
        //   if(req.body.type ===deviceConstants.printerTypes.blueToothPrinter){
        //     if(!req.body.comPort){
        //       throw deviceDefinition.CONST_ERROR_INVALID_PARAMETERS
        //     }
        //   }
        //   else if(req.body.type ===deviceConstants.printerTypes.usbPrinter){
        //     if(!req.body.port||req.body.ipAddress){
        //       throw deviceDefinition.CONST_ERROR_INVALID_PARAMETERS
        //     }
        //   }
        newPrinter(
            req.deviceId,
            req.body.printerGroupId,
            req.body.port,
            req.body.comPort,
            req.body.type,
            req.body.nodeId,
            req.body.backupPrinterId,
            req.body.ipAddress,
            req.transaction,
            1,
            1
        ).then((printer) => {
            res.status(HttpStatus.OK).send(printer)
        })
    } catch (error) {
        console.log(error)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
    }
}

const newPrinter = (
    deviceId,
    printerGroupId,
    port,
    comPort,
    type,
    nodeId,
    backUpPrinterId,
    ipAddress = null,
    transaction,
    userId = 1,
    roleId
) => {
    // const deviceController = require('./DeviceController')
    return new Promise(async (resolve, reject) => {
        try {
            // const entity = deviceConstants.entities.printer
            // const action = deviceConstants.actions.create
            // const permissionCntrlr = new permissionController()
            // const entityPermittedAttrs = await permissionCntrlr.getPermissions(
            //   entity,
            //   [],
            //   action,
            //   roleId,
            //   transaction,
            // )
            // if (!entityPermittedAttrs.includes(deviceConstants.permissionAttributes.createPrinter)) {
            //   throw deviceDefinition.CONST_ERROR_PERMISSION_DEBIED
            // }
            const printerCreateObj = {
                deviceId,
                printerGroupId,
                port,
                comPort,
                type,
                backUpPrinterId,
                ipAddress,
                createdBy: userId,
            }
            Model.Printer.create(printerCreateObj, { transaction: transaction })
                .then(async (printer) => {

                    await transaction.commit();
                    // const printerDetails =await getPrinterByDeviceId(deviceId)
                    resolve(printer)
                    return

                })
                .catch((error) => {
                    reject(error)
                })
        } catch (error) {
            await transaction.rollback()
            reject(error)
        }
    })
}

module.exports =
    { createPrinter }