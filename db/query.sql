select e.id, e.first_name, e.last_name, r.title, d.dept_name as department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
				from employees e left join role r on r.id = e.role_id
				left join department d on d.id = r.department_id
                 LEFT JOIN employees m ON m.id = e.manager_id;