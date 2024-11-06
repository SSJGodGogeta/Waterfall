--liquibase formatted sql
--changeset arman:ar1 runOnChange:true
INSERT INTO staff(staff_id, first_name, last_name, target_hours, salary_euro, max_vacation_days, supervisor_id, user_user_id, role_role_id, project_project_id, group_group_id) VALUES (1, 'Agathe', 'Berke', 40, 1200.00, 28, 2, 1, 4, 1, 1);
INSERT INTO staff(staff_id, first_name, last_name, target_hours, salary_euro, max_vacation_days, supervisor_id, user_user_id, role_role_id, project_project_id, group_group_id) VALUES (2, 'Naomi', 'Middendorf', 40, 1200.00, 28, null, 2, 1, 1, 1);
INSERT INTO staff(staff_id, first_name, last_name, target_hours, salary_euro, max_vacation_days, supervisor_id, user_user_id, role_role_id, project_project_id, group_group_id) VALUES (3, 'Bjoern', 'Brandner', 40, 1200.00, 28, null, 3, 3, 1, 3);
INSERT INTO staff(staff_id, first_name, last_name, target_hours, salary_euro, max_vacation_days, supervisor_id, user_user_id, role_role_id, project_project_id, group_group_id) VALUES (4, 'Lasse', 'Schlueter', 40, 1200.00, 28, null, 4, 2, 1, 3);
INSERT INTO staff(staff_id, first_name, last_name, target_hours, salary_euro, max_vacation_days, supervisor_id, user_user_id, role_role_id, project_project_id, group_group_id) VALUES (5, 'Armanbir', 'Singh', 40, 1200.00, 28, null, 5, 1, 1, 2);
INSERT INTO staff(staff_id, first_name, last_name, target_hours, salary_euro, max_vacation_days, supervisor_id, user_user_id, role_role_id, project_project_id, group_group_id) VALUES (6, 'Kevin', 'Schmidthaeusler', 40, 1200.00, 28, null, 6, 1, 1, 2);
COMMIT;

-- changeset arman:ar2 runOnChange:true
UPDATE staff set last_name = 'Schmidhausler' where staff_id = 6;
commit ;

-- changeset arman:ar3 runOnChange:true
UPDATE staff set target_hours = 8 ;
COMMIT