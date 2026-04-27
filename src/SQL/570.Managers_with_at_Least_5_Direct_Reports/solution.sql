-- Write your PostgreSQL query statement below
SELECT name
FROM Employee e1 JOIN 
(
    SELECT managerId, COUNT(*)
    FROM Employee
    WHERE managerId IS NOT NULL
    GROUP BY managerId
) e2 ON e1.id = e2.managerId
WHERE e2.count >= 5
