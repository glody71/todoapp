'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Todos', 'priority', {
      type: Sequelize.ENUM('high', 'medium', 'low'),
      allowNull: false,
      defaultValue: 'low'
    });

    await queryInterface.addColumn('Todos', 'due_date', {
      type: Sequelize.DATE,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Todos', 'priority');
    await queryInterface.removeColumn('Todos', 'due_date');
  }
};
