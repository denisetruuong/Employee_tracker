import inquirer from 'inquirer';
import { pool, connectToDB } from './connection';

await connectToDB();

async function startMenu() {
    inquirer
    .prompt ([
        {
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: [
                'View all employees', 'View all departments', 'View all roles', 'Add employee', 'Add department', 'Add role', 'Update employee role', 'Quit'
            ],
        },
    ])
    .then((answers) => {
        switch (answers.menu) {
            case 'View all employees':
               console.log
               let employeeSQL = `SELECT * FROM employee`;
               pool.query(employeeSQL, (err, res) => {
           if (error) {
            console.log(error);
                      }
                    console.table(res.rows);
                startMenu();
            });
            break;
            case "View all roles":
                console.log("View all roles");
                let roleSQL = `SELECT * FROM role`;
                pool.query(roleSQL, (err, res) => {
                    if (error) {
                        console.log(error);
                    }
                    console.table(res.rows);
                    startMenu();
                });
                break;
                case "View all departments":
                    console.log("View all departments");
                    let departmentSQL = `SELECT * FROM department`;
                    pool.query(departmentSQL, (err, res) => {
                        if (error) {
                            console.log(error);
                        }
                        console.table(res.rows);
                        startMenu();
                    });
                    break;
                    case "Add employee":
                        console.log("Add employee");
                        pool.query(`SELECT * FROM role`, (error, results) => {
                            if (error) {
                                console.log(error);
                            }
                            console.table(res.rows);
                            inquirer
                            .prompt([
                                {
                                    type: "input",
                                    name: "first_name",
                                    message: "Enter employee's first name",
                                },
                                {
                                    type: "input",
                                    name: "last_name",
                                    message: "Enter employee's last name",
                                },
                                {
                                    type: "list",
                                    name: "role_id",
                                    message: "Select employee's role",
                                    choices: res.rows.map((role) => {
                                        return {
                                            name: role.title,
                                            value: role.id,
                                        };
                            ]),
                            .then((answers) => {
                                let employeeSQL = `INSERT INTO employee (first_name, last_name, role_id) VALUES ($1, $2, $3)`;
                                let employeeAddParams = [
                                    answers.first_name,
                                    answers.last_name,
                                    answers.role_id,
                                    answers.manager_id,
                                ];
                                pool.query(employeeSQL, employeeAddParams, (error, results) => {
                                    if (error) {
                                        console.log(error);
                                    }
                                    console.log("Employee added");
                                    startMenu();
                                });
                            });
                        });
                        break;
                        case "Add role":
                            console.log("Add role");
                            pool.query(`SELECT * FROM department`, (error, results) => {
                                if (error) {
                                    console.log(error);
                                }
                                console.table(res.rows);
                                inquirer
                                .prompt([
                                    {
                                        type: "input",
                                        name: "title",
                                        message: "Enter role title",
                                    },
                                    {
                                        type: "input",
                                        name: "salary",
                                        message: "Enter role salary",
                                    },
                                    {
                                        type: "list",
                                        name: "department_id",
                                        message: "Select role department",
                                        choices: res.rows.map((department) => {
                                            return {
                                                name: department.name,
                                                value: department.id,
                                            };
                                        }),
                                    },
                                ])
                                .then((answers) => {
                                    let roleSQL = `INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)`;
                                    let roleAddParams = [
                                        answers.title,
                                        answers.salary,
                                        answers.department_id,
                                    ];
                                    pool.query(roleSQL, roleAddParams, (error, results) => {
                                        if (error) {
                                            console.log(error);
                                        }
                                        console.log("Role added");
                                        startMenu();
                                    });
                                });
                            });
                            break;
                            case "Add department":
                                inquirer
                                .prompt([
                                    {
                                        type: "input",
                                        name: "name",
                                        message: "Enter department name",
                                    },
                                ])
                                .then((answers) => {
                                    let departmentSQL = `INSERT INTO department (name) VALUES ($1)`;
                                    let departmentAddParams = [answers.name];
                                    pool.query(departmentSQL, departmentAddParams, (error, results) => {
                                        if (error) {
                                            console.log(error);
                                        }
                                        console.log("Department added");
                                        startMenu();
                                    });
                                });
                                break;
                                case "Update employee role":
                                    console.log("Update employee role");

                                    pool.query(`SELECT * FROM employee`, (error, employeeRes) => {
                                        if (error) {
                                            console.log(error);
                                        }
                                        console.table(employeeRes.rows);

                                        pool.query(`SELECT * FROM role`, (error, roleRes) => {
                                            if (error) {
                                                console.log(error);
                                            }
                                            console.table(roleRes.rows);
                                            inquirer
                                            .prompt([
                                                {
                                                    type: "list",
                                                    name: "employee_id",
                                                    message: "Select employee to update",
                                                    choices: employeeRes.rows.map((employee) => {
                                                        return {
                                                            name: `${employee.first_name} ${employee.last_name}`,
                                                            value: employee.id,
                                                        };
                                                    }),
                                                },
                                                {
                                                    type: "list",
                                                    name: "role_id",
                                                    message: "Select new role",
                                                    choices: roleRes.rows.map((role) => {
                                                        return {
                                                            name: role.title,
                                                            value: role.id,
                                                        };
                                                    }),
                                                },
                                            ])
                                            .then((answers) => {
                                                let employeeUpdateSQL = `UPDATE employee SET role_id = $1 WHERE id = $2`;
                                            let employeeUpdateParams = [answers.role_id, answers.employee_id];
                                            pool.query (employeeUpdateSQL, employeeUpdateParams, (error, results) => {
                                                if (error) {
                                                    console.log(error);
                                                }
                                                console.log("Employee role updated");
                                                startMenu();
                                            }
                                        );
                                    });
                                });
                                break;
                                case "Quit":
                                    console.log("Goodbye!");
                                    process.exit(0);
                                    default
                                    console.log("Invalid selection");
                                    break;
                            }
                        });
                    }
                    startMenu();
                                        


                            
                            
