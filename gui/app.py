from flask import url_for
from flask_bootstrap import Bootstrap
from flask import Flask, render_template, request
 

app = Flask(__name__, static_url_path='/static')
Bootstrap(app)



@app.route('/')
@app.route('/home')
def home():
    return render_template('index.html')



