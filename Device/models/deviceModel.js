var commonHelper = require("../../Helper");
module.exports = (sequelize, DataTypes) => {
    var device = sequelize.define(
      'Device',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          field: 'c1'
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          field: 'c2'
        },
        deviceTypeId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          field: 'c3'
        },
        isActive: {
          type: DataTypes.INTEGER,
          field: 'c4',
          defaultValue: 1
        },
        osVersion: {
          type: DataTypes.STRING,
          allowNull: true,
          field: 'c5'
        },
        registeredAt: {
          type: DataTypes.INTEGER,
          allowNull: true,
          field: 'c6'
        },
        createdAt: {
          type: DataTypes.INTEGER,
          field: 'c7'
        },
        updatedAt: {
          type: DataTypes.INTEGER,
          allowNull: true,
          field: 'c8'
        },
        createdBy: {
          type: DataTypes.INTEGER,
          allowNull: true,
          field: 'c9'
        },
        updatedBy: {
          type: DataTypes.INTEGER,
          allowNull: true,
          field: 'c10'
        },
        creatorUserAgent: {
          type: DataTypes.STRING,
          allowNull: true,
          field: 'c11'
        },
        creatorIpAddress: {
          type: DataTypes.STRING,
          allowNull: true,
          field: 'c12'
        },
        status:{
          type: DataTypes.INTEGER,
          allowNull: false,
          field: 'c13'
        },
        description:{
          type: DataTypes.STRING,
          allowNull: true,
          field: 'c14'
        },
        model:{
          type: DataTypes.STRING,
          allowNull: true,
          field: 'c15'
        },
        manufacturer:{
          type: DataTypes.STRING,
          allowNull: true,
          field: 'c16'
        }
      },
      {
        tableName: 't103',
        hasTrigger: true,
        // hooks: {
        //   beforeValidate(deviceObject, options) {
        //     if (!deviceObject) return
  
        //     deviceObject.createdAt = commonHelper.getTimeStamp()
        //   },
        //   beforeUpdate(deviceObject, options) {
        //     if (!deviceObject) return
  
        //     deviceObject.updatedAt = commonHelper.getTimeStamp()
        //   },
        // },
      },
    )
  
    device.associate = function (models) {
      device.hasOne(models.Printer, {
        foreignKey: 'deviceId',
      })
     
    }
  
    device.beforeCreate(function (summary, options) {
      summary.createdAt = Math.round(new Date().getTime() / 1000)
    })
    device.beforeUpdate(function (summary, options) {
      summary.updatedAt = Math.round(new Date().getTime() / 1000)
    })
  
  
    return device
  }