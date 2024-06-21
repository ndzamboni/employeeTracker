-- seeds.sql
INSERT INTO department (name) VALUES 
('Sales'), 
('Engineering'), 
('Finance');

INSERT INTO role (title, salary, department_id) VALUES 
('Sales Manager', 80000, 1), 
('Software Engineer', 90000, 2), 
('Accountant', 70000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('John', 'Doe', 1, NULL), 
('Jane', 'Smith', 2, NULL), 
('Emily', 'Jones', 3, NULL);
