# GUI compoment - a helper GUI to be used with API.

Implemented using Flask and Vue2
To use, run 
```
docker-compose up -d --build
```
and open browser at 0.0.0.0:5001

# Static files

`Static files` are located in `static` directory and have the following
structure:
- static
   - js
      - vue_app.js
      - jquery_app.js
   - css
      - main.css

- templates
   - index.html

- routes
   - `/`
   - `/home`

   Routes to display the GUI with form and two panels - anagrams and
   non-anagrams processed. 

# GUI
The GUI has a form for two words. Initial Vue validation is done on the 
front end layer to verify no empty anagrams provided `vue_app.js` has the 
logic for this. Once a pair of string is validated as either anagram or 
non-anagram, it's added to either left (non-anagrams) or the right (anagrams)
panel. Each panel contains the pairs that were previosly processed along whith
the times whenan those agrams (non-anagrams) were processed. In case the API 
returns true, the fading notificiation (fading alert) is displayed for the 
success, if false - the fading notification (fading alert) is displayed for 
failure (the result of the back end call after the front end validation 
succeeds). More logic may be needed to perform different CRUD operations for
anagrams and non-anagrams panels (left and right of the form. 
For more details on structure please see
`templates/index.html` and related javascript Vue code in `vue_app.js`.
 

The template `index.html` is a standard html template using `Vue2` to add
some  interactivity. It's default Jinja2 template with no sub-templates.
Bootstrap is used for responsive layout.

### TODO
- Add support for `webpack`, `yarn`, `npm` to use with `Vue`.
- Add asset compression.
- Add more configuration options for assets.
- Add configurable IP and port options for GUI.
- Add more CRUD operations - removing items, updating.
