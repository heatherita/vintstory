# Config settings go here

import os
basedir = os.path.abspath(os.path.dirname(__file__))
class Config(object):
	SQLALCHEMY_DATABASE_URI = 'sqlite:///vintage_whatever.db'

