-- Write your PostgreSQL query statement below
SELECT a.machine_id, ROUND(CAST(AVG(b.timestamp-a.timestamp) AS NUMERIC), 3) AS processing_time
FROM Activity a JOIN Activity b 
ON a.machine_id = b.machine_id AND a.process_id = b.process_id AND a.activity_type != b.activity_type
WHERE a.activity_type = 'start'
GROUP BY a.machine_id
