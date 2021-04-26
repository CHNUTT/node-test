'use strict';

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

let sequelize;

if (config.production) {
  sequelize = new Sequelize(
    process.env[config.database],
    process.env[config.username],
    process.env[config.password],
    {
      host: process.env[config.host],
      dialect: process.env[config.dialect],
      dialectOptions: {
        useUTC: false,
      },
      // ...(config.testproduction && { logging: false }),
      pool: { maxConnections: 5, maxIdleTime: 30 },
      language: 'en',
      maxConcurrentQueries: 100,
      timezone: '-5:00',
    }
  );
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    // db[model.name[0].toUpperCase() + model.name.slice(1).toLowerCase()] = model;
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
