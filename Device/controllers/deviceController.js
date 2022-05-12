const { Transaction } = require('sequelize');
const Model = require('../../util/database');
var HttpStatus = require('http-status')
/**
 * Creating a Device In DB
 * @param {*} name
 * @param {*} deviceTypeId
 * @param {*} autoApprove
 * @param {*} osVersion
 * @param {*} creatorUserAgent
 * @param {*} creatorIpAddress
 * @param {*} description
 * @param {*} manufacturer
 * @param {*} manufacturer
 * @returns
 */
 const newDevice = (
    name,
    deviceTypeId,
    autoApprove,
    osVersion = null,
    creatorUserAgent = null,
    creatorIpAddress = null,
    description = null,
    manufacturer = null,
    model = null,
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        var transaction = await Model.sequelize.transaction()
        // const createdAt = commonHelper.getTimeStamp()
        let deviceCreateObj = {
          name,
          deviceTypeId,
          osVersion,
          creatorUserAgent,
          creatorIpAddress,
          description,
          manufacturer,
          model,
          // createdAt
        }
          deviceCreateObj.status = 2
      
        const device = await Model.Device.create(deviceCreateObj, {
          transaction: transaction,
        })
        resolve({ deviceId: device.id, transaction: transaction })
        return
      } catch (error) {
        console.log(error)
        if (transaction && transaction instanceof Transaction)
          await transaction.rollback()
        reject(error)
      }
    })
  }
  const createDevice = async (req, res, next) => {
    try {
      let autoApprove = true
      if (!req.body.name || !req.body.deviceTypeId) {
        throw 'bad request'
      }
      newDevice(
        req.body.name,
        req.body.deviceTypeId,
        autoApprove,
        req.body.osVersion,
        req.body.creatorUserAgent,
        req.body.creatorIpAddress,
        req.body.description,
        req.body.manufacturer,
        req.body.model,
      )
        .then((device) => {
          req.transaction = device.transaction
          req.deviceId = device.deviceId
          next()
        })
        .catch((error) => {
          console.log(error)
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
        })
    } catch (error) {
      console.log(error)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
    }
  }



  module.exports={
    createDevice
  }
