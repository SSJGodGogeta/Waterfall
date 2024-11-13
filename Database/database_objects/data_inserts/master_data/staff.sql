--liquibase formatted sql
--changeset arman:ar1 runOnChange:true
INSERT INTO staff(staff_id, first_name, last_name, target_hours, salary_euro, max_vacation_days, supervisor_id, user_user_id, role_role_id, project_project_id, group_group_id) VALUES (1, 'Agathe', 'Berke', 8, 1200.00, 28, 2, 1, 4, 1, 1);
INSERT INTO staff(staff_id, first_name, last_name, target_hours, salary_euro, max_vacation_days, supervisor_id, user_user_id, role_role_id, project_project_id, group_group_id) VALUES (2, 'Naomi', 'Middendorf', 8, 1200.00, 28, null, 2, 3, 1, 1);
INSERT INTO staff(staff_id, first_name, last_name, target_hours, salary_euro, max_vacation_days, supervisor_id, user_user_id, role_role_id, project_project_id, group_group_id) VALUES (3, 'Bjoern', 'Brandner', 8, 1200.00, 28, null, 3, 2, 1, 3);
INSERT INTO staff(staff_id, first_name, last_name, target_hours, salary_euro, max_vacation_days, supervisor_id, user_user_id, role_role_id, project_project_id, group_group_id) VALUES (4, 'Lasse', 'Schlueter', 8, 1200.00, 28, null, 4, 1, 1, 3);

INSERT INTO staff(staff_id, first_name, last_name, target_hours, salary_euro, max_vacation_days, supervisor_id, user_user_id, role_role_id, project_project_id, group_group_id) VALUES (5, 'Armanbir', 'Singh', 8, 6000.00, 28, null, 5, 1, 1, 2);
INSERT INTO staff(staff_id, first_name, last_name, target_hours, salary_euro, max_vacation_days, supervisor_id, user_user_id, role_role_id, project_project_id, group_group_id) VALUES (6, 'Kevin', 'Schmidhausler', 8, 6000.00, 28, null, 6, 2, 1, 2);
INSERT INTO staff(staff_id, first_name, last_name, target_hours, salary_euro, max_vacation_days, supervisor_id, user_user_id, role_role_id, project_project_id, group_group_id) VALUES (7, 'Dominik', 'Szabo', 8, 4200.00, 28, null, 7, 3, 1, 2);
INSERT INTO staff(staff_id, first_name, last_name, target_hours, salary_euro, max_vacation_days, supervisor_id, user_user_id, role_role_id, project_project_id, group_group_id) VALUES (8, 'Diana', 'Schaefer', 8, 4200.00, 28, 7, 8, 4, 1, 3);
INSERT INTO staff(staff_id, first_name, last_name, target_hours, salary_euro, max_vacation_days, supervisor_id, user_user_id, role_role_id, project_project_id, group_group_id) VALUES (9, 'Felix', 'Au', 8, 4200.00, 28, 7, 9, 4, 1, 3);

COMMIT;
