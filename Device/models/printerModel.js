var commonHelper = require("../../Helper");
module.exports = (sequelize, DataTypes) => {
  var printer = sequelize.define(
    'Printer',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'c1',
      },
      type: {
        type: DataTypes.ENUM(1, 2, 3),
        allowNull: false,
        field: 'c2',
      },
      port: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'c3',
      },
      ipAddress: {
        type: DataTypes.STRING,
        field: 'c4',
      },
      pin: {
        type: DataTypes.INTEGER,
        field: 'c5',
      },
      deviceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'c6',
      },
      comPort: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'c7',
      },
      lastTestStatus: {
        type: DataTypes.INTEGER,
        field: 'c8',
      },
      lastTestedAt: {
        type: DataTypes.INTEGER,
        field: 'c9',
      },
      backUpPrinterId: {
        type: DataTypes.INTEGER,
        field: 'c10',
      },
      printerGroupId: {
        type: DataTypes.INTEGER,
        field: 'c11',
      },
      createdAt: {
        type: DataTypes.INTEGER,
        field: 'c12',
      },
      updatedAt: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'c13',
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'c14',
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'c15',
      },
    },
    {
      tableName: 't104',
      hasTrigger: true,
      hooks: {
        beforeCreate(printerObject, options) {
          if (!printerObject) return

          printerObject.createdAt = commonHelper.getTimeStamp()
        },
        beforeUpdate(printerObject, options) {
          if (!printerObject) return

          printerObject.updatedAt = commonHelper.getTimeStamp()
        },
      },
    },
  )
  printer.beforeCreate(function (obj, options) {
    obj.createdAt = Math.round(new Date().getTime() / 1000)
  })
  printer.beforeUpdate(function (summary, options) {
    summary.updatedAt = Math.round(new Date().getTime() / 1000)
  })

  printer.associate = function (models) {
    printer.belongsTo(models.Device, {
      foreignKey: 'deviceId',
    }),
    printer.belongsToMany(models.PrinterGroups, {
       through: models.PrinterGroupAssignment 
      })
    };

  return printer
}