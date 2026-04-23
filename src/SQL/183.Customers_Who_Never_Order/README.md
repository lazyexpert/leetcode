# 183. Customers Who Never Order

Table: `Customers`

| Column Name | Type    |
|-------------|---------|
| id          | int     |
| name        | varchar |

`id` is the primary key for this table. Each row indicates the ID and name of a customer.

Table: `Orders`

| Column Name | Type |
|-------------|------|
| id          | int  |
| customerId  | int  |

`id` is the primary key for this table. `customerId` is a foreign key referencing `id` in the `Customers` table. Each row indicates the ID of an order and the ID of the customer who ordered it.

Write a solution to find all customers who never order anything.

Return the result table in any order.

## Example

```
Input:
Customers table:
+----+-------+
| id | name  |
+----+-------+
| 1  | Joe   |
| 2  | Henry |
| 3  | Sam   |
| 4  | Max   |
+----+-------+

Orders table:
+----+------------+
| id | customerId |
+----+------------+
| 1  | 3          |
| 2  | 1          |
+----+------------+

Output:
+-----------+
| Customers |
+-----------+
| Henry     |
| Max       |
+-----------+
```
