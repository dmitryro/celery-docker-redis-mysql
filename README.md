# Docker Flask Celery Redis Vue - Sample Flow

A basic [Docker Compose](https://docs.docker.com/compose/) flow to utilize
Celery queue, Redis, MySQL, Vue and simple microservice api

### Installation

```bash
git clone https://github.com/dmitryro/sometests
```

### Build & Launch

```bash
docker-compose up -d --build
```

This will expose the Flask application's endpoints on port `5000` as well as a flower server for monitoring workers on port `5555`

To add more workers:
```bash
docker-compose up -d --scale worker=5 --no-recreate
```

To shut down:

```bash
docker-compose down
```

If you would like to change the endpoints, update the code in [api/app.py](api/app.py)

Task changes should happen in [queue/tasks.py](celery-queue/tasks.py) 


### To run GUI:
Once the API has started and is running on port 5000, navigate your broser to:

```
http://0.0.0.0:5001
```

In the middle section you'll see the form to check, on the left panel
you'll get  the list of all the non-anagrams and the times when they were checked,
on the right - all the anagrams that succeed along with times.

See the GUI README file at [GUI](https://github.com/dmitryro/celery-docker-redis-mysql/tree/master/gui]).

See the API README file at [API](https://github.com/dmitryro/celery-docker-redis-mysql/tree/master/api]).

See the MySQL README file at [MySQL](https://github.com/dmitryro/celery-docker-redis-mysql/tree/master/mysql).

See the Celery README file at [Celery](https://github.com/dmitryro/celery-docker-redis-mysql/tree/master/celery).


adapted from [https://github.com/itsrifat/flask-celery-docker-scale](https://github.com/itsrifat/flask-celery-docker-scale)
