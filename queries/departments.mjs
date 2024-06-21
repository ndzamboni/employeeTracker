import db from '../db/db.mjs';
import inquirer from 'inquirer';

export async function viewAllDepartments() {
  const res = await db.query('SELECT * FROM department');
  console.table(res.rows);
}

export async function addDepartment() {
  const answers = await inquirer.prompt([
    {
      name: 'name',
      message: 'Enter the name of the department:',
    },
  ]);
  await db.query('INSERT INTO department (name) VALUES ($1)', [answers.name]);
  console.log(`Added department ${answers.name}`);
}
