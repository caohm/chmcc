CREATE DATABASE IF NOT EXISTS CHMCC;

USE CHMCC;

DROP TABLE IF EXISTS sys_user;

CREATE TABLE sys_user (
  Id              BIGINT NOT NULL,
  organization_id BIGINT,
  username        VARCHAR(100),
  password        VARCHAR(100),
  salt            VARCHAR(100),
  role_ids        VARCHAR(100),
  locked          TINYINT,
  CONSTRAINT PK_EXAMPLE_ORDER PRIMARY KEY (id)
);
-- admin 123456
INSERT INTO sys_user (Id, organization_id, username, password, salt, role_ids, locked)
VALUES (1, 1, 'admin', 'eecdfcb1189cf2a62b4a0119062a1277', '84b13fe49957351da2285bb07b6a7e4e', 'admin', 0);