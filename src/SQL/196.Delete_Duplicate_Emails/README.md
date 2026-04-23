# 196. Delete Duplicate Emails

Table: `Person`

| Column Name | Type    |
|-------------|---------|
| id          | int     |
| email       | varchar |

`id` is the primary key for this table. Each row contains an email. The emails will not contain uppercase letters.

Write a solution to delete all duplicate emails, keeping only one unique email with the smallest `id`.

Note: you are supposed to write a `DELETE` statement, not a `SELECT` one. After running your script, the remaining `Person` table is shown as the answer.

## Example

```
Input:
Person table:
+----+------------------+
| id | email            |
+----+------------------+
| 1  | john@example.com |
| 2  | bob@example.com  |
| 3  | john@example.com |
+----+------------------+

Output:
+----+------------------+
| id | email            |
+----+------------------+
| 1  | john@example.com |
| 2  | bob@example.com  |
+----+------------------+

Explanation: john@example.com is repeated two times. We keep the row with the smallest id = 1.
```
