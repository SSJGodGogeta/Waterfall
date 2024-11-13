--liquibase formatted sql
--changeset arman:ar1 runOnChange:true
INSERT INTO project(project_id, project_name, project_description, project_due_date, group_group_id) VALUES (1, 'Time Management System', 'Create a modern Time Management System to replace our current TMS', CURRENT_DATE, 1);
INSERT INTO project(project_id, project_name, project_description, project_due_date, group_group_id) VALUES (2, 'Aircraft detection', 'Create an Aircraft detection System for FRAPORT', CURRENT_DATE, 2);
INSERT INTO project(project_id, project_name, project_description, project_due_date, group_group_id) VALUES (3, 'TMS Testing', 'Test the new Time Management System to guarantee its functionality', CURRENT_DATE, 3);
COMMIT;