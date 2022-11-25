from app import MYSQL

mysql=MYSQL


def getSelections():

    selection="Seleccion"
    cursor= mysql.connection.cursor() 
    cursor.execute('''SELECT name FROM teams WHERE type =%s ''',[selection])
    teams = cursor.fetchall()
    load={}
    load['TSelec']=[]
    for selecTeams in teams:
       load['TSelec'].append(selecTeams[0])
    
   
    return load

def getLocals():

    local="Local"
    cursor= mysql.connection.cursor() 
    cursor.execute('''SELECT name FROM teams WHERE type =%s ''',[local])
    teams = cursor.fetchall()
    load={}
    load['ELocal']=[]
    for localTeams in teams:
       load['ELocal'].append(localTeams[0])
    
   
    return load
