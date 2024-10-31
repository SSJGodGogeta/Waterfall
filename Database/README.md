# Waterfall Project
A Liquibase repository for managing the MySQL DB for the Waterfall Project

## Development Environment Setup
1. Download and install MySQL 8.4.1 LTS Community Edition: https://dev.mysql.com/downloads/mysql/  (Important: note the username, password, port! U will need them later)
2. Download and install Liquibase: https://www.liquibase.com/download
3. Download and install MySQL Workbench: https://dev.mysql.com/downloads/workbench/
4. Start MySQL Workbench, setup a new connection. Enter the data from step 1 here (hostname=localhost), username, password and port are from the config. Create a schema called "waterfall_swe" in your local MySQL DB instance.
5. Connect to the created database as the root user.
6. In Database/database_objects/liquibase/  rename the template.dev.properties to dev.properties and change the values here aswell (port, host ...)
7. In your terminal change to the database_objects folder and run the command
```
liquibase  --defaultsFile=liquibase/dev.properties update
```
...to create the tables and views from this repository in your newly created MySQL schema.
