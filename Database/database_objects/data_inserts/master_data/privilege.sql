--liquibase formatted sql
--changeset arman:ar1 runOnChange:true
INSERT INTO privilege (privilege_id, privilege_techcode) VALUES
                                      (1,'ADMIN'),
                                      (2, 'HR'),
                                      (3, 'SUPERVISOR'),
                                      (4, 'EMPLOYEE');
COMMIT;