--liquibase formatted sql
--changeset arman:ar1 runOnChange:true
INSERT INTO staff_group (group_id, group_name) VALUES (1, 'Managers');
INSERT INTO staff_group (group_id, group_name) VALUES (2, 'Developers');
INSERT INTO staff_group (group_id, group_name) VALUES (3, 'Testers');
COMMIT;