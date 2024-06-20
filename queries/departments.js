// departments.js
const db = require('../db/db');

async function viewAllDepartments() {
  const res = await db.query('SELECT * FROM department');
  console.table(res.rows);
}

async function addDepartment() {
  const inquirer = require('inquirer');
  const answers = await inquirer.prompt([
    {
      name: 'name',
      message: 'Enter the name of the department:',
    },
  ]);
  await db.query('INSERT INTO department (name) VALUES ($1)', [answers.name]);
  console.log(`Added department ${answers.name}`);
}

module.exports = {
  viewAllDepartments,
  addDepartment,
};
