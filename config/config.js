require("dotenv").config();
console.log(process.env.USER_NAME);
module.exports = {
  development: {
    username: process.env.USER_NAME,
    password:null,
    database: process.env.DB,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
  },
  test: {
    username: process.env.USER_NAME,
    password: process.env.PASSWORD || null,
    database: process.env.DB,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
  },
  production: {
    username: process.env.USER_NAME,
    password: process.env.PASSWORD || null,
    database: process.env.DB,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
  },
};
