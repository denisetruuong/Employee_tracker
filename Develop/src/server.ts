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
                            )
          