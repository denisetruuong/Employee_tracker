SELECT department.department_name AD department,role.title, employee.last_name FROM employee
JOIN role ON employee.last_name FROM employee
ORDER BY department.department_name, role.title, employee.last_name;
LEFT JOIN employee ON manager_id=employee.id