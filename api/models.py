from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import *
from flask_marshmallow import Marshmallow

app = Flask(__name__, instance_relative_config=True)
Base = declarative_base()
ma = Marshmallow(app)

class Record(Base):
    """ The record to save in MySQL"""

    id = Column(Integer, primary_key=True)
    first_word = Column(String(256), unique=False)
    second_word = Column(String(256), unique=False)
    is_valid = Column(Boolean, unique=False)
    date_checked = Column(DateTime(timezone=True), 
                                   server_default=func.now())

    __tablename__ = "record"

    def __init__(self, first_word=None, second_word=None, 
                 is_valid=False, date_checked=func.now()):
        self.first_word = first_word
        self.second_word = second_word
        self.is_valid = is_valid
        self.date_checked = date_checked 

    def __repr__(self):
        return "<Record {} vs {} {}>".format(self.first_word, 
                                             self.last_word, 
                                             self.is_valid)


class RecordSchema(ma.ModelSchema):
    """ Use this schema to serialize records """
    class Meta:
        model = Record


