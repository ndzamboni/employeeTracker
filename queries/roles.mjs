import client from '../config/connection.js';
import 'console.table';

export async function viewAllRoles() {
  try {
    const res = await client.query('SELECT * FROM role;');
    if (res.rows.length === 0) {
      console.log('No roles found.');
    } else {
      console.table(res.rows);
    }
  } catch (err) {
    console.error('Error fetching roles:', err);
  }
}

export async function addRole(title, salary, department_id) {
  try {
    const res = await client.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *', [title, salary, department_id]);
    console.log('Role added:', res.rows[0]);
  } catch (err) {
    console.error('Error adding role:', err);
  }
}

export async function deleteRole(id) {
  try {
    const res = await client.query('DELETE FROM role WHERE id = $1 RETURNING *', [id]);
    console.log('Role deleted:', res.rows[0]);
  } catch (err) {
    console.error('Error deleting role:', err);
  }
}
