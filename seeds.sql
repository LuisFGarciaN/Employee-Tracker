-- Insert departments
INSERT INTO departments (name) VALUES ('HR');
INSERT INTO departments (name) VALUES ('IT');
INSERT INTO departments (name) VALUES ('Finance');

-- Insert roles
INSERT INTO roles (title, salary, department_id) VALUES ('HR Manager', 60000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ('IT Specialist', 55000, 2);
INSERT INTO roles (title, salary, department_id) VALUES ('Accountant', 50000, 3);

-- Insert employees
INSERT INTO employees (first_name, last_name, role_id, ) VALUES ('John', 'Doe', 1, NULL);
INSERT INTO employees (first_name, last_name, role_id, ) VALUES ('Jane', 'Smith', 2, 1);
INSERT INTO employees (first_name, last_name, role_id, ) VALUES ('Mark', 'Johnson', 3, 1);
