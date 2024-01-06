'use strict';

const role = require('../enum/role');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      // Define your User model fields here
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      isLogIn: {
        type: Sequelize.BOOLEAN,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
      },
      role: {
        type: Sequelize.ENUM(...Object.values(role))
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });

    // Seed data
    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'Ashish',
        lastName: 'Rayalwar',
        email: 'ashish@gmail.com',
        password: 'hashed_password', // replace with the actual hashed password ( adminpassword )
        isLogIn: true,
        isDeleted: false,
        isVerified: true,
        isActive: true,
        role: role.admin,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more seed data as needed
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  },
};
