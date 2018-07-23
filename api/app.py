#################
#### imports ####
#################
from datetime import datetime
import logging
 
from flask import Flask, jsonify, render_template
from flask import url_for
from flask_cors import CORS, cross_origin


from sqlalchemy import *
from sqlalchemy.orm.session import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

from worker import celery
import celery.states as states

from models import Record, RecordSchema
 
################
#### config ####
################
 
app = Flask(__name__, instance_relative_config=True)
CORS(app)

def obtain_session():
    """ Get SQLAlchemy session """
    engine = create_engine('mysql+mysqlconnector://root:secret@mysql:3306/maindb')
    session = sessionmaker()
    # Bind the sessionmaker to engine
    session.configure(bind=engine)
    return session()
 
@app.route('/anagram/<string:word_one>/<string:word_two>')
def anagram(word_one, word_two):
    """ Verify two strings are anagrams """
    task = celery.send_task('tasks.anagram', args=[word_one, word_two], kwargs={})
    is_valid = task.get()
 
    try:
        record = Record(first_word = word_one,
                        second_word = word_two,
                        is_valid = is_valid)
        s = obtain_session()
        s.add(record)
        s.commit()
        s.flush()
        logging.info("Saved new record  ------------> {} vs {}".format(word_one, word_two))        
    except Exception as e:
        logging.error("Failed saving record ----------------> - {}".format(e))

    return jsonify({"is_anagram":is_valid})


@app.route('/check/<string:task_id>')
def check_task(task_id):
    res = celery.AsyncResult(task_id)
    if res.state == states.PENDING:
        return res.state
    else:
        return str(res.result)

@app.route('/delete/<int:id>')
def delete_one(id):
    sess = obtain_session()
    record = sess.query(Record).get(id)
    sess.delete(record)
    sess.commit()
    all_records = sess.query(Record).all()
    records_schema = RecordSchema(many=True)
    result = records_schema.dump(all_records)
    return jsonify(result.data)


@app.route('/readall/')
def readall():
    sess = obtain_session()
    all_records = sess.query(Record).all()
    records_schema = RecordSchema(many=True)
    result = records_schema.dump(all_records)
    return jsonify(result.data)


@app.route('/readbystate/<int:valid>')
def read_bystate(valid):
    sess = obtain_session()
    all_records = sess.query(Record).filter_by(is_valid=valid)
    records_schema = RecordSchema(many=True)
    result = records_schema.dump(all_records)
    return jsonify(result.data)

