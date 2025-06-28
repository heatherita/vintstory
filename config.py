# Config settings go here

import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
	SQLALCHEMY_DATABASE_URI = 'sqlite:///vintage_whatever.db'
	SQLALCHEMY_TRACK_MODIFICATIONS = False

class ProductionConfig(Config):
	SQLALCHEMY_DATABASE_URI = 'sqlite:///vintage_whatever.db'
	SQLALCHEMY_TRACK_MODIFICATIONS = False

class DevelopmentConfig(Config):
	SQLALCHEMY_DATABASE_URI = 'sqlite:///vintage_whatever.db'
	SQLALCHEMY_TRACK_MODIFICATIONS = False
