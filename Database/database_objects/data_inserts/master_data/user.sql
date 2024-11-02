--liquibase formatted sql
--changeset arman:ar1 runOnChange:true
INSERT INTO user(user_id, user_email, user_salt, user_password) VALUES (1, 'agatheberke@stc.com', '123456789salt', 'topSecretPassword1' );
INSERT INTO user(user_id, user_email, user_salt, user_password) VALUES (2, 'naomiMiddendorf@stc.com', '123456789salt', 'topSecretPassword2' );
INSERT INTO user(user_id, user_email, user_salt, user_password) VALUES (3, 'bjoerndbrandner@stc.com', '123456789salt', 'topSecretPassword3' );
INSERT INTO user(user_id, user_email, user_salt, user_password) VALUES (4, 'lasseschlueter@stc.com', '123456789salt', 'topSecretPassword4' );
INSERT INTO user(user_id, user_email, user_salt, user_password) VALUES (5, 'armansingh@stc.com', '123456789salt', 'topSecretPassword5' );
INSERT INTO user(user_id, user_email, user_salt, user_password) VALUES (6, 'kevinschmidhaeusler@stc.com', '123456789salt', 'topSecretPassword6' );
COMMIT;