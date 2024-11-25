DROP DATABASE IF EXISTS bootcamp;
CREATE DATABASE bootcamp;

\c bootcamp;

CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department (id)
    REFERENCES department (id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role (id)
    REFERENCES role (id)
    ON DELETE SET NULL,
    FOREIGN KEY (manager_id) REFERENCES employee (id)
    REFERENCES employee (id)
    ON DELETE SET NULL
);

INSERT INTO department (department_name)