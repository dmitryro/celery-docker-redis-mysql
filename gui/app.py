from flask import Flask
from flask import url_for
from flask_bootstrap import Bootstrap
from worker import celery
import celery.states as states
from flask import Flask, render_template, request
 

app = Flask(__name__, static_url_path='/static')
Bootstrap(app)



@app.route('/')
@app.route('/home')
def home():
    user = "User"
    return render_template('index.html', user=user)



