# 177. Nth Highest Salary

Table: `Employee`

| Column Name | Type |
|-------------|------|
| id          | int  |
| salary      | int  |

`id` is the primary key for this table. Each row contains information about the salary of an employee.

Write a solution to find the `n`th highest **distinct** salary from the `Employee` table. If there are fewer than `n` distinct salaries, return `null`.

## Example 1

```
Input:
Employee table:
+----+--------+
| id | salary |
+----+--------+
| 1  | 100    |
| 2  | 200    |
| 3  | 300    |
+----+--------+
n = 2

Output:
+------------------------+
| getNthHighestSalary(2) |
+------------------------+
| 200                    |
+------------------------+
```

## Example 2

```
Input:
Employee table:
+----+--------+
| id | salary |
+----+--------+
| 1  | 100    |
+----+--------+
n = 2

Output:
+------------------------+
| getNthHighestSalary(2) |
+------------------------+
| null                   |
+------------------------+
```
