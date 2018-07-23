# GUI compoment of the app - a helper GUI to be used with API

Implemented using Flask and Vue2
To use run 
```
docker-compose up -d --build
```
and open browser at 0.0.0.0:5001

# Static files

Static files are located in `static` directory and have the following
structure:
- static
-- js
--- vue_app.js
--- jquery_app.js
-- css
--- main.css

- templates
- - index.html

The template index.html is a standard html template using Vue2 for interctivity
and
This will expose the Flask application's endpoints on port `5000` as well as a
flower server for monitoring workers on port `5555`

### TODO
Add support for webpack, yarn, npm to use with Vue2
Add asset compression.
Add configurable IP and port options for GUI.
Add more CRUD operations - removing items, updating.
