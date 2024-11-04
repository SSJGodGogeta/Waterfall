--liquibase formatted sql
--changeset arman:ar1
DELETE FROM user;
INSERT INTO user(user_id, user_email, user_password, user_token) VALUES (1, 'agatheberke@stc.com', 'topSecretPassword1', '' );
INSERT INTO user(user_id, user_email, user_password, user_token) VALUES (2, 'naomiMiddendorf@stc.com', 'topSecretPassword2', '' );
INSERT INTO user(user_id, user_email, user_password, user_token) VALUES (3, 'bjoerndbrandner@stc.com', 'topSecretPassword3', '' );
INSERT INTO user(user_id, user_email, user_password, user_token) VALUES (4, 'lasseschlueter@stc.com', 'topSecretPassword4', '' );
INSERT INTO user(user_id, user_email, user_password, user_token) VALUES (5, 'armansingh@stc.com', 'topSecretPassword5', '' );
INSERT INTO user(user_id, user_email, user_password, user_token) VALUES (6, 'kevinschmidhaeusler@stc.com', 'topSecretPassword6', '' );
COMMIT;