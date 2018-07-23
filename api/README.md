# API compoment of the app 
 - a set of RESTful endpoints to save records, 

Implemented using `Flask`, `Celery` and `Marchmallow`

To use run 
```
docker-compose up -d --build
```
and open browser at 0.0.0.0:5000 or use Postman or curl to hit.



# Static files

`API` is a Flask application running using Gunicorn. 

   `/anagram/<string:word_one>/<string:word_two>` 
       Takes to strings : `word_one` and `word_two`, places them
       into Celery queue, waits for result, reads result and
       returns back True if valid anagram, False otherwice.

   `/readall/`
       Read all the records from MySQL database. Render them
       as JSON using Marchmallow module.

   `/readbystate/<int:state_id>`   
       Return all anagrams for state_id = 1 and all non-anagrams
       for state_id = 0

   `/delete/<int:id>`
       Take a record id and remove it from MySQL database.

Models:
   - file `models.py`
   - Models used: Record model to save 2 words, result of validations,
     time processed.
   
Marchmallow schemas:
   = file `models.py`
   - Schemas: RecordSchema created out of Record model to render JSON.


Databases: 
   - `maindb` is the MySQL database used with SQLAlchemy to save records.
   - `Dockerfile` contains the settings for user credentials
   - `schemas/schema.sql` contains the initial migration to create
     when `docker-compose build` is run.

### TODO
# Add Nginx support.
# Add caching and optimize Celery tasks for better performance.
# Make MySQL connection configurable from cfg file.
# Add more configurability for IPs/ports 
