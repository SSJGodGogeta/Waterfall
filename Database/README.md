# Waterfall Project
A Liquibase repository for managing the MySQL DB for the Waterfall Project

## Development Environment Setup
1. Download and install MySQL 8.4.1 LTS Community Edition: https://dev.mysql.com/downloads/mysql/ 
2. Download and install Liquibase: https://www.liquibase.com/download
3. Download and install MySQL Workbench: https://dev.mysql.com/downloads/workbench/
4. Open MySQL Workbench and run the following statements:
```
CREATE SCHEMA waterfall_swe;
CREATE USER 'waterfall_swe'@'localhost' IDENTIFIED BY 'Sonntag';
GRANT ALL ON waterfall_swe.* TO 'waterfall_swe'@'localhost' WITH GRANT OPTION;
commit;
```
5. In your terminal change to the database_objects folder and run the command
```
liquibase  --defaultsFile=liquibase/dev.properties update
```
...to create the tables and views from this repository in your newly created MySQL schema.
