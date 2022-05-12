var commonHelper = require("../../Helper");
module.exports = (sequelize, DataTypes) => {
    var printerGroupAssignment = sequelize.define(
      'PrinterGroupAssignment',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          field: 'c1',
        },
        printerGroupId:{
          type: DataTypes.INTEGER,
          allowNull: false,
          field: 'c2',
        },
        printerId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: 'c3',
        },
        assignedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          field: 'c4',
        },
        assignedBy: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: 'c5',
        },
      },
      {
        tableName: 't112',
        hooks: {
            beforeDestroy(printerGroupObject, options) {
              if(printerGroupObject)
              return (printerGroupObject.assignedAt = commonHelper.getTimeStamp());
            },
          },
      },
    )
  
    return printerGroupAssignment
  }