--liquibase formatted sql
--changeset arman:ar1 runOnChange:true
INSERT INTO project(project_id, project_name, project_description, project_due_date, group_group_id) VALUES (1, 'Time Management System', 'Lazy description', CURRENT_DATE, 1);
COMMIT;