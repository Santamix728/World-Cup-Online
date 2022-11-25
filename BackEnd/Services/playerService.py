from app import *
from ConsultsDB.playersConsults import *


"""

Service Complete

"""
@app.route('/getPlayersMatch/<type>,<team1>,<team2>', methods = ['GET'])
def getPlayersMatch(type,team1,team2):  
    if type=="localTeam":
        playersMatch = playersFromLocal(team1,team2)
    elif type=="selecTeam":
        playersMatch = playersFromSelec(team1,team2)
    else:playersMatch="Error"
    return playersMatch

