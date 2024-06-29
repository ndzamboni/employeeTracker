import client from '../config/connection.js';
import 'console.table';

export async function viewAllDepartments() {
  try {
    const res = await client.query('SELECT * FROM department;');
    if (res.rows.length === 0) {
      console.log('No departments found.');
    } else {
      console.table(res.rows);
    }
  } catch (err) {
    console.error('Error fetching departments:', err);
  }
}

export async function addDepartment(name) {
  try {
    const res = await client.query('INSERT INTO department (name) VALUES ($1) RETURNING *', [name]);
    console.log('Department added:', res.rows[0]);
  } catch (err) {
    console.error('Error adding department:', err);
  }
}

export async function deleteDepartment(id) {
  try {
    const res = await client.query('DELETE FROM department WHERE id = $1 RETURNING *', [id]);
    console.log('Department deleted:', res.rows[0]);
  } catch (err) {
    console.error('Error deleting department:', err);
  }
}
