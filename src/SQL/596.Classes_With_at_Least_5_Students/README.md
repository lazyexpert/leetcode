# 596. Classes With at Least 5 Students

Table: `Courses`

| Column Name | Type    |
|-------------|---------|
| student     | varchar |
| class       | varchar |

`(student, class)` is the primary key for this table. Each row indicates the name of a student and the class they are enrolled in.

Write a solution to find all the classes that have at least five students.

Return the result table in any order.

## Example

```
Input:
Courses table:
+---------+----------+
| student | class    |
+---------+----------+
| A       | Math     |
| B       | English  |
| C       | Math     |
| D       | Biology  |
| E       | Math     |
| F       | Computer |
| G       | Math     |
| H       | Math     |
| I       | Math     |
+---------+----------+

Output:
+---------+
| class   |
+---------+
| Math    |
+---------+

Explanation:
- Math has 6 students, so we include it.
- English has 1 student, so we do not include it.
- Biology has 1 student, so we do not include it.
- Computer has 1 student, so we do not include it.
```
