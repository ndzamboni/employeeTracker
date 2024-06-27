import client from '../config/connection.js';
import cTable from 'console.table';

export async function viewAllRoles() {
  try {
    const res = await client.query('SELECT * FROM role');
    console.table(res.rows);
  } catch (err) {
    console.error('Error fetching roles:', err);
  }
}

export async function addRole(title, salary, departmentId) {
  try {
    await client.query(
      'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
      [title, salary, departmentId]
    );
    console.log('Role added successfully.');
  } catch (err) {
    console.error('Error adding role:', err);
  }
}

export async function deleteRole(id) {
  try {
    await client.query('DELETE FROM role WHERE id = $1', [id]);
    console.log('Role deleted successfully.');
  } catch (err) {
    console.error('Error deleting role:', err);
  }
}
