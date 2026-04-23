# Write your MySQL query statement below
SELECT e.name as Employee
FROM Employee as e
JOIN Employee as m on e.managerId = m.id
WHERE e.salary > m.salary
