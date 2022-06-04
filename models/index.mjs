import { Sequelize } from 'sequelize';
import url from 'url';
import allConfig from '../config/config.js';

import requestModel from './request.mjs';
import userModel from './user.mjs';
import leaveModel from './leave.mjs';
import relationshipModel from './relationship.mjs';

const env = process.env.NODE_ENV || 'development';

const config = allConfig[env];

const db = {};

let sequelize;

if (env === 'production') {
  // break apart the Heroku database url and rebuild the configs we need

  const { DATABASE_URL } = process.env;
  const dbUrl = url.parse(DATABASE_URL);
  const username = dbUrl.auth.substr(0, dbUrl.auth.indexOf(':'));
  const password = dbUrl.auth.substr(dbUrl.auth.indexOf(':') + 1, dbUrl.auth.length);
  const dbName = dbUrl.path.slice(1);

  const host = dbUrl.hostname;
  const { port } = dbUrl;

  config.host = host;
  config.port = port;

  sequelize = new Sequelize(dbName, username, password, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.Request = requestModel(sequelize, Sequelize.DataTypes);
db.Leave = leaveModel(sequelize, Sequelize.DataTypes);
db.User = userModel(sequelize, Sequelize.DataTypes);
db.Relationship = relationshipModel(sequelize, Sequelize.DataTypes);

db.Request.belongsTo(db.User);
db.User.hasMany(db.Request);

db.Leave.belongsTo(db.User);
db.User.hasMany(db.Leave);

// in order for the many-to-many to work we must mention the join table here.
db.User.belongsToMany(db.User, { as: 'Approver', foreignKey: 'approverId', through: 'relationship' });
db.User.belongsToMany(db.User, { as: 'Member', foreignKey: 'memberId', through: 'relationship' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
