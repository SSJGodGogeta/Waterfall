# Important Liquibase commands
## U always have to run these commands from cmd in ur database_objects folder


## update-sql
Allows you to inspect the SQL Liquibase will run while using the update command (like a dry-run).
```
liquibase  --defaultsFile=liquibase/dev.properties update-sql
```

### Mostly used btw whenever a change has been done and u need to update ur local db:
## update
Runs the changesets on the given target db that weren't run yet.
```
liquibase  --defaultsFile=liquibase/dev.properties update
```
### All other commands
...can be found here: https://docs.liquibase.com/commands/command-list.html



## How a changeset comment should looks like
```
--changeset USER_CHANGED:ID
```
- USER_CHANGED:   The name of the user who made the change

- ID:             An ID that must be unique within the file (=changelog)
  You can simply count up within the file (1, 2, 3)

### Note: without a valid new changeset, ur changes wont have any affect on the db. Liquibase will throw an error!
Best Practices: https://www.liquibase.org/get-started/best-practices