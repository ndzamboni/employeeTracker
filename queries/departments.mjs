import client from '../config/connection.js';
import cTable from 'console.table';

export async function viewAllDepartments() {
  try {
    const res = await client.query('SELECT * FROM department');
    console.table(res.rows);
  } catch (err) {
    console.error('Error fetching departments:', err);
  }
}

export async function addDepartment(name) {
  try {
    await client.query('INSERT INTO department (name) VALUES ($1)', [name]);
    console.log('Department added successfully.');
  } catch (err) {
    console.error('Error adding department:', err);
  }
}

export async function deleteDepartment(id) {
  try {
    await client.query('DELETE FROM department WHERE id = $1', [id]);
    console.log('Department deleted successfully.');
  } catch (err) {
    console.error('Error deleting department:', err);
  }
}
