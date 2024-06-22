import inquirer from 'inquirer';
import client from '../db/db.mjs';

export async function viewAllDepartments() {
  try {
    const res = await client.query('SELECT * FROM department');
    if (res.rows.length === 0) {
      console.log('No departments found. Please add a department.');
      await addDepartment();
    } else {
      console.table(res.rows);
    }
  } catch (error) {
    console.error('Error fetching departments:', error);
  }
}

export async function addDepartment() {
  const answers = await inquirer.prompt([
    { type: 'input', name: 'name', message: 'Enter department name:' }
  ]);

  try {
    await client.query('INSERT INTO department (name) VALUES ($1)', [answers.name]);
    console.log('Department added successfully.');
  } catch (error) {
    console.error('Error adding department:', error);
  }
}
