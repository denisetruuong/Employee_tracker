INSERT INTO department (department_name) 
VALUES ('Human Resources'), 
('Marketing'), 
('Customer Service'), 

INSERT INTO role (title, salary, department_id)
VALUES ('HR Manager', 80000, 1),
('HR Assistant', 40000, 1),
('Marketing Manager', 80000, 2),
('Marketing Assistant', 40000, 2),
('Customer Service Manager', 80000, 3),

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Mike', 'Jones', 3, NULL),
('Mary', 'Johnson', 4, 3),
('Chris', 'Brown', 5, NULL),
