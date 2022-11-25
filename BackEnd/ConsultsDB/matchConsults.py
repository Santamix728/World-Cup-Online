from app import MYSQL
from ConsultsDB.playersConsults import *
mysql=MYSQL

"""

Service Complete

"""
def createMatchDB(request):

    _id='[value-1]'
    date= request.json['date']
    time= request.json['time']
    fase=request.json['fase']
    team1=request.json['team1']
    team2=request.json['team2']
    place=request.json['place']
    _idTournament=request.json['_idTournament']
    
    
    cursor= mysql.connection.cursor()
    cursor.execute('''INSERT INTO matchs VALUES(%s,%s,%s,%s,%s,%s,%s,%s)''',(_id,date,time,fase,team1,team2,place,_idTournament))   
    mysql.connection.commit()
    cursor.close()
    return "Done"

def getMatchsDB(idTournament):
    
    cursor= mysql.connection.cursor() 
    cursor.execute('''SELECT _id,team1,team2 FROM matchs WHERE _idTournament=%s''',[idTournament])
    tournament = cursor.fetchall()
    load={}
    load["Matchs"] = []
    for tournamentins in tournament:
        load["Matchs"].append(tournamentins)
    resp={}
    response=[]
    
    for index in load['Matchs']:

        resp['MatchID']=(index[0])
        resp['TeamA']=(index[1])
        resp['TeamB']=(index[2])
        loadTeamA=playersFromTeam1(index[1])
        loadTeamB=playersFromTeam1(index[2])
        resp['PlayersA']=loadTeamA
        resp['PlayersB']=loadTeamB
        response.append(resp)
        resp={}
        
        

    return response



def getAllMatchsDB():
    
    cursor= mysql.connection.cursor() 
    cursor.execute('''SELECT * FROM matchs''')
    tournament = cursor.fetchall()
    load={}
    load["Matchs"] = []
    for tournamentins in tournament:
        load["Matchs"].append(tournamentins)

    return load
