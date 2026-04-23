# 182. Duplicate Emails

Table: `Person`

| Column Name | Type    |
|-------------|---------|
| id          | int     |
| email       | varchar |

`id` is the primary key for this table. Each row contains an email. The emails will not contain uppercase letters.

Write a solution to report all the duplicate emails. The email field is guaranteed not to be NULL.

Return the result table in any order.

## Example

```
Input:
Person table:
+----+---------+
| id | email   |
+----+---------+
| 1  | a@b.com |
| 2  | c@d.com |
| 3  | a@b.com |
+----+---------+

Output:
+---------+
| Email   |
+---------+
| a@b.com |
+---------+

Explanation: a@b.com is repeated two times.
```
