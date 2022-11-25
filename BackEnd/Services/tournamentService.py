from app import *
from ConsultsDB.tournamentConsults import *


"""

Service complete

"""
@app.route('/getTournament', methods = ['GET'])
def getTournament():

    Tournaments = getTournaments()
    return Tournaments


"""

Service complete

"""
@app.route('/getTournamentDB', methods = ['GET'])
def getTournamentDB():

    Tournaments = getTournamentsDB_ID()
    return Tournaments
"""

Service complete

"""
@app.route('/getTournamentID/<name>', methods = ['GET'])
def getTournamentID(name):

    TournamentID = getTournamentID_db(name)
    return TournamentID


"""

Service complete

"""
@app.route('/getFaseTournament/<id>', methods = ['GET'])
def getFaseTournament(id):

    Fase = getFase(id)
    return Fase
    

"""

Service complete

"""
@app.route('/getTeamsTournament/<id>', methods = ['GET'])
def getTeamsTournament(id):
    print(id)
    Teams = getTeams(id)
    return Teams


"""

Service complete

"""
@app.route('/createTournaments', methods = ['POST'])
def createTournaments():

    name = request.json['name']
    startDate = request.json['startDate']
    endDate= request.json['endDate']
    description= request.json['description']
    teams=request.json['teams']
    fases=request.json['fases']
    createTournamentsDB(request)

    return "Done"
