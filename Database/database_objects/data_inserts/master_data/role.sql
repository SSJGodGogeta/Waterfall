--liquibase formatted sql
--changeset arman:ar1 runOnChange:true
INSERT INTO role(role_id, role_name, privilege_privilege_id) VALUES (1, 'Senior Programmer', 3);
INSERT INTO role(role_id, role_name, privilege_privilege_id) VALUES (2, 'CEO', 1);
INSERT INTO role(role_id, role_name, privilege_privilege_id) VALUES (3, 'Human resource manager', 3);
INSERT INTO role(role_id, role_name, privilege_privilege_id) VALUES (4, 'Programmer', 4);
COMMIT;