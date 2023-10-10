'use strict';
const dotenv = require('dotenv')
const { v4: uuid } = require('uuid')
const bcrypt = require('bcrypt')

dotenv.config()
const saltRounds = Number(process.env.SALTROUNDS)

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          userId: uuid(),
          firstName: 'Umuhire',
          lastName: 'Jessie',
          email: 'umuhirejessie@gmail.com',
          password: await bcrypt.hash('123Password', saltRounds),
          role: 'admin',
          isVerified: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
