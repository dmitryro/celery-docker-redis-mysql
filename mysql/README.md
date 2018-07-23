### MySQL Dockerized used with API

# Databases
   - `maindb` is the MySQL database used with SQLAlchemy to save and read records.
   - `Dockerfile` contains the settings for user credentials
   - `schema/schema.sql` contains the initial migration to create for table
     `record`. 

# Todo
   - Provide more configuration options.
   - Provide better migrations.
   - Remove passwords and usernames from Dockerfile and 
     make them configurable based on environment.

