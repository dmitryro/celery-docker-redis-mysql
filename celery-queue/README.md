# Celery Task Queue 

# Tasks
 - tasks.py is the file.
 - `anagram` task - this is where we actually compute the anagram
 - `read` task - just a stub, not implemented. More tasks
    will be added as logic is migrated from Flask endpoints into tasks.

# Broker
 - We use Redis broker runing on localhost and port 6379
 - We might need to cluster it and scale, so better ip/port handling
   will be needed
 
# Worker
 - The worker is run using `celery -A tasks worker --loglevel=info`.

### TODO
 - Move more logic from API endpoints into Celery taks queue.
 - Provide better delay times and optimize for scalability.
 - Add heartbeat.
 
