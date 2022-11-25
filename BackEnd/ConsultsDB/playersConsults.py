from app import MYSQL

mysql=MYSQL

def playersFromTeam1(team1):

    cursor= mysql.connection.cursor() 
    cursor.execute('''SELECT name,lastname FROM players WHERE localTeam=%s or selecTeam=%s''',[team1,team1])
    teamA = cursor.fetchall()

    loadTeamA=[]
    for playersIn in teamA:
        loadTeamA.append(playersIn)

    return loadTeamA

def playersFromTeam2(team2):

    cursor= mysql.connection.cursor() 
    cursor.execute('''SELECT name,lastname FROM players WHERE localTeam=%s or selecTeam=%s''',[team2,team2])
    teamB = cursor.fetchall()

    loadTeamB=[]
    for playersIn in teamB:
        loadTeamB.append(playersIn)
    return loadTeamB