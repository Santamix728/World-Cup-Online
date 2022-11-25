from flask import Flask,render_template, request
from flask_mysqldb import MySQL
 
app = Flask(__name__)
 
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'xfifa_db'

MYSQL = MySQL(app)

from Services.baseService import *
from Services.matchService import *
from Services.playerService import *
from Services.userService import *
from Services.tournamentService import *
from Services.teamService import *
from Services.poolService import *
from Services.resultService import *



app.run(host='localhost', port=5000, debug=True)