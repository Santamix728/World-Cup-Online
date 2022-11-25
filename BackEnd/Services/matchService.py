from app import *
from ConsultsDB.matchConsults import *



"""

Service Complete

"""

@app.route('/createMatch', methods = ['POST'])
def createMatch():

    Match= createMatchDB(request)

    return Match

"""

Service complete 

"""
@app.route('/getMatchs/<idTournament>', methods = ['GET'])
def getMatschs(idTournament):
    matchs=getMatchsDB(idTournament)
    return matchs

"""

Service complete 

"""
@app.route('/getAllMatchs/', methods = ['GET'])
def getAllMatschs():
    matchs=getAllMatchsDB()
    return matchs