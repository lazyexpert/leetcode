# 176. Second Highest Salary

Table: `Employee`

| Column Name | Type |
|-------------|------|
| id          | int  |
| salary      | int  |

`id` is the primary key for this table. Each row contains information about the salary of an employee.

Write a solution to find the second highest **distinct** salary from the `Employee` table. If there is no second highest salary, return `null`.

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

Output:
+---------------------+
| SecondHighestSalary |
+---------------------+
| 200                 |
+---------------------+
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

Output:
+---------------------+
| SecondHighestSalary |
+---------------------+
| null                |
+---------------------+
```
