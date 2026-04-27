-- Write your PostgreSQL query statement below
SELECT 
    s.student_id, 
    s.student_name, 
    sub.subject_name, 
    count(e.student_id) as attended_exams  
FROM Students s 
CROSS JOIN subjects sub
LEFT JOIN Examinations e ON s.student_id = e.student_id and sub.subject_name = e.subject_name
GROUP BY s.student_id, s.student_name, sub.subject_name
