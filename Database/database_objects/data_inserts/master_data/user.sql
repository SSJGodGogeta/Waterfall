--liquibase formatted sql
--changeset arman:ar1
INSERT INTO user(user_id, user_email, user_password, user_imageurl, user_token) VALUES (1, 'agatheberke@stc.com', '$2a$10$YTZ17zEARPmEc5doi10cnOyS0t51zj3rnPKEIAhpC1luxakaq3Q4a', '/Webpage/assets/demo/profile_pictures/agathe_berke.jpg', '' );
INSERT INTO user(user_id, user_email, user_password, user_imageurl, user_token) VALUES (2, 'naomiMiddendorf@stc.com', '$2a$10$oqqDRZTRz/hqR8ySIkgdTeC/seus4zLZyViz7oLbHpSPbVKaoXc9.', '/Webpage/assets/demo/profile_pictures/naomi_middendorf.jpg', '' );
INSERT INTO user(user_id, user_email, user_password, user_imageurl, user_token) VALUES (3, 'bjoerndbrandner@stc.com', '$2a$10$L.4bZQ8SxG1kndLQjtkoje2L9vLigPgfJk5Di4UPAKikuKyF/GxlO','/Webpage/assets/demo/profile_pictures/bjoernd_brandner.jpg', '' );
INSERT INTO user(user_id, user_email, user_password, user_imageurl, user_token) VALUES (4, 'lasseschlueter@stc.com', '$2a$10$lAJxh3Ej6T0QFPfk5RI/TujlfKR11YQMaiCD9M/zNtZwUWBmhOTMy','/Webpage/assets/demo/profile_pictures/lasse_schlueter.jpg', '' );
INSERT INTO user(user_id, user_email, user_password, user_imageurl, user_token) VALUES (5, 'armansingh@stc.com', '$2a$10$jqrFJlBljvPWlhoqTkT4w.9ryuiBqY/ZgeJ9MX86eQ/rjORzp/Vtm','', '' );
INSERT INTO user(user_id, user_email, user_password, user_imageurl, user_token) VALUES (6, 'kevinschmidhaeusler@stc.com', '$2a$10$tyoyrqi3Bn9puaQHiS2dxeOZDq1eRZkSCq/6/.klHZCs9x0HjKNv2','', '' );
INSERT INTO user(user_id, user_email, user_password, user_imageurl, user_token) VALUES (7, 'dominikszabo@stc.com', '$2a$12$NIb/alBVYdR5lsGXNrkG6.6rbL2dVgWwfBzXbRCxA0y5fV9adMFqu','', '' );
INSERT INTO user(user_id, user_email, user_password, user_imageurl, user_token) VALUES (8, 'dianaschaefer@stc.com', '$2a$12$KtMtuCmBxb1R2S/di8O7be9Kz7bnntegoXROHqyQvclVW7blp.cTS','', '' );
INSERT INTO user(user_id, user_email, user_password, user_imageurl, user_token) VALUES (9, 'felixau@stc.com', '$2a$12$wOl2BRtdCfY6BcOMtaSZn.VSo1dkjQ7PF1G4aKTopZ7X8jD6rZcX.','', '' );

COMMIT;