const { Sequelize, Op } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize("zPOS_SHIP_DEV", "logisoft", "Newteam@9", {
  dialect: "mssql",
  host: "10.0.12.30",
  port: "1433",
  driver: "tedious",
  define: {
    timestamps: false,
  },
});

const db = {};
var filesArray = [
  "../printerGroup/models/printerGroups",
  "../printerGroup/models/printerGroupTriggers",
  '../Device/models/deviceModel',
  "../Device/models/printerModel",
  "../Device/models/printerGroupAssignment"
];

filesArray.forEach((file) => {
  var model = require(path.join(__dirname, file))(
    sequelize,
    Sequelize.DataTypes
  );
  db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Op;

// db.sequelize
//  .sync()
//  .then(()=>{
//      console.log("Database and tables created!");
//  }).catch(err=>console.log(err.original));

console.log("DB connected successfully!");

module.exports = db;
