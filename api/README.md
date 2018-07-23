# API compoment of the app 
 - a set of RESTful endpoints to save records, 

Implemented using `Flask`, `Celery` and `Marchmallow`

To use run 
```
docker-compose up -d --build
```
and open browser at 0.0.0.0:5000 or use Postman or curl to hit.



# RESTful Endpoints

`API` is a Flask application running using Gunicorn. 

   `/anagram/<string:word_one>/<string:word_two>` 
       Takes to strings : `word_one` and `word_two`, places them
       into [Celery](https://github.com/dmitryro/celery-docker-redis-mysql/tree/master/celery-queue) queue, waits for result, reads result and
       returns back True if valid anagram, False otherwice.

   `/readall/`
       Read all the records from MySQL database. Render them
       as JSON using Marchmallow module.

   `/readbystate/<int:valid>`   
       Return all anagrams for valid = 1 and all non-anagrams
       for valid = 0. 

   `/delete/<int:id>`
       Take a record id and remove it from MySQL database.

   `/check/<string:task_id>`
       Provide a task ID and read task status - helper endpoint.

# Models

   - file `models.py`
   - Models used: Record model to save 2 words, result of validations,
     time processed.
   
# Marchmallow 
   Marchmallow is a Python module alowing to serialize data into JSON
   It uses schemas defined based on fields that need to be rendered - 
   here we use it with Record model and construct schema out of model.

   - file `models.py`
   - Schemas: RecordSchema created out of Record model to render JSON.

# Databases
   - `maindb` is the MySQL database used with SQLAlchemy to save records.
   - `Dockerfile` contains the settings for user credentials
   - `mysql/schema/schema.sql` contains the initial migration to create
     when `docker-compose build` is run.

### TODO
 - Add Nginx support.
 - Add caching and optimize
   [Celery](https://github.com/dmitryro/celery-docker-redis-mysql/tree/master/celery-queue) tasks for better performance.
 - Make MySQL connection configurable from cfg file.
 - Add more configurability for IPs/ports 
 - Add better migrations for MySQL using SQLAlchemy.
 - Add more
   [Celery](https://github.com/dmitryro/celery-docker-redis-mysql/tree/master/celery-queue) tasks and outsource the logic from endpoints into tasks.

