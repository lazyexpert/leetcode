# 577. Employee Bonus

Table: `Employee`

| Column Name | Type    |
|-------------|---------|
| empId       | int     |
| name        | varchar |
| supervisor  | int     |
| salary      | int     |

`empId` is the column with unique values for this table. Each row indicates the name and ID of an employee, their salary, and the ID of their manager.

Table: `Bonus`

| Column Name | Type |
|-------------|------|
| empId       | int  |
| bonus       | int  |

`empId` is the column with unique values for this table. `empId` is a foreign key referencing `empId` from the `Employee` table. Each row contains the ID of an employee and their respective bonus.

Write a solution to report the name and bonus amount of each employee who has a bonus less than 1000, or who did not receive any bonus.

Return the result table in any order.

## Example

```
Input:
Employee table:
+-------+--------+------------+--------+
| empId | name   | supervisor | salary |
+-------+--------+------------+--------+
| 3     | Brad   | null       | 4000   |
| 1     | John   | 3          | 1000   |
| 2     | Dan    | 3          | 2000   |
| 4     | Thomas | 3          | 4000   |
+-------+--------+------------+--------+

Bonus table:
+-------+-------+
| empId | bonus |
+-------+-------+
| 2     | 500   |
| 4     | 2000  |
+-------+-------+

Output:
+------+-------+
| name | bonus |
+------+-------+
| Brad | null  |
| John | null  |
| Dan  | 500   |
+------+-------+
```
