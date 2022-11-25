from app import MYSQL

mysql=MYSQL

def createTournamentsDB(request):

    _id='[value-1]'
    name = request.json['name']
    startDate = request.json['startDate']
    endDate= request.json['endDate']
    description= request.json['description']
    teams=request.json['teams']
    fases=request.json['fases']
    _idTournament=''
    cursor= mysql.connection.cursor()
    cursor.execute('''INSERT INTO tournament VALUES(%s,%s,%s,%s,%s)''',(_id,name,startDate,endDate,description))
    mysql.connection.commit()
    

    cursor.execute('''SELECT _id from tournament WHERE name=%s''',[name])
    idtor=cursor.fetchone()

    for idx in idtor:
        _idTournament=idx

    for teamsinsert in teams:
        print(teamsinsert)
        
        cursor.execute('''INSERT INTO teamstournament VALUES(%s,%s)''',(_idTournament,teamsinsert))
        mysql.connection.commit()
        

    for fasesinsert in fases:
        print(fasesinsert)
       
        cursor.execute('''INSERT INTO fasestournament VALUES(%s,%s)''',(_idTournament,fasesinsert))
        mysql.connection.commit()

    cursor.close()
    return "Done"
    
def getTournaments():

    cursor= mysql.connection.cursor() 
    cursor.execute('''SELECT name FROM tournament ''')
    torneos = cursor.fetchall()
    print(torneos)
    load={}
    load['Tournaments']=[]

    for torneoss in torneos:
        load['Tournaments'].append(torneoss)

    return load

def getTournamentsDB_ID():

    cursor= mysql.connection.cursor() 
    cursor.execute('''SELECT _id FROM tournament ''')
    torneos = cursor.fetchall()
    print(torneos)
    load={}
    load['Tournaments']=[]

    for torneoss in torneos:
        load['Tournaments'].append(torneoss)

    return load

def getTournamentID_db(name):

    cursor= mysql.connection.cursor() 
    cursor.execute('''SELECT _id FROM tournament WHERE name=%s''',[name])
    id = cursor.fetchone()
    load={"_id": 0}
    load['_id']=id

    return load


def getFase(id):

    cursor= mysql.connection.cursor() 
    cursor.execute('''SELECT fase FROM fasestournament where _idTournament=%s''',[id])
    fase = cursor.fetchall()
    load={}
    load['Fases']=[]
    for faseins in fase:
       load['Fases'].append(faseins[0])
    return load

def getTeams(id):

    cursor= mysql.connection.cursor()
    cursor.execute('''SELECT team FROM teamstournament where _idTournament=%s''',[id])
    equipos = cursor.fetchall()
    load={}
    load['Teams']=[]
    for equiposOby in equipos:
       load['Teams'].append(equiposOby[0])
    
   
    return load
