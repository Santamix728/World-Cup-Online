from app import MYSQL

mysql=MYSQL

def createResultDB(request):
    _idPartido = request.json['matchID']
    winner = request.json['winner']
    teamAScore= request.json['teamAScore']
    teamBScore= request.json['teamBScore']
    mvpGame=request.json['MVP']
    goalA=request.json['goalA']
    goalB=request.json['goalB']
    assistA=request.json['assistA']
    assistB=request.json['assistB']
    _id='[value-1]'
    _idTournament=''

    cursor= mysql.connection.cursor()

    cursor.execute('''SELECT _idTournament from matchs WHERE _id=%s''',[_idPartido])
    idtor=cursor.fetchone()

    cursor.execute('''INSERT INTO footballresults VALUES(%s,%s,%s,%s,%s,%s)''',(_id,_idPartido,winner,mvpGame,teamAScore,teamBScore))
    mysql.connection.commit()
    
    for id in idtor:
        _idTournament=id

    i = 0
    for goalInsertA in goalA:

        
        cursor.execute('''INSERT INTO goalsadminpool VALUES(%s,%s,%s,%s)''',(_id,_idPartido, goalInsertA, "teamA"))
        mysql.connection.commit()
        
        i+=1

    for goalInsertB in goalB:

     
        cursor.execute('''INSERT INTO goalsadminpool VALUES(%s,%s,%s,%s)''',(_id,_idPartido, goalInsertB,"teamB"))
        mysql.connection.commit()
        
        i+=1

    j = 0
    for assitInsertA in assistA:

       
        cursor.execute('''INSERT INTO assistadminpool VALUES(%s,%s,%s,%s)''',(_id,_idPartido , assitInsertA,"teamA"))
        mysql.connection.commit()
       
        j+=1

    for assitInsertB in assistB:

        
        cursor.execute('''INSERT INTO assistadminpool VALUES(%s,%s,%s,%s)''',(_id,_idPartido , assitInsertB,"teamB"))
        mysql.connection.commit()
        
        j+=1

    cursor.close()
    print(_idTournament)

    insertPointsDB(_idPartido,_idTournament)
    return "Done"

def getResultsDB():

    cursor = mysql.connection.cursor()
    cursor.execute(''' SELECT * FROM footballresults ''')
    results = cursor.fetchall()
    load = {}
    load ['Results'] = []

    for resultss in results:
        load['Results'].append(resultss)
    
    return load


def insertPointsDB(_idPartido,_idTournament):
    _idLiga="1"
    cursor= mysql.connection.cursor() 

    cursor.execute('''SELECT username FROM footballpools WHERE _idPartido=%s''',[_idPartido])
    select=cursor.fetchall()
    print(select)

    for index in select:
        points=0
        cursor.execute('''SELECT footballpools.username AS username FROM footballpools INNER JOIN footballresults ON footballpools._idPartido = footballresults._idPartido &&
        footballpools.username = %s && footballpools.winner = footballresults.winner''',[index])
        teams = cursor.fetchone()

        if(teams):
            points=points+10

        cursor.execute('''SELECT footballpools.username AS username FROM footballpools INNER JOIN footballresults ON footballpools._idPartido = footballresults._idPartido && 
        footballpools.username = %s && footballpools.mvpGame = footballresults.mvpGame''',[index])
        teams2 = cursor.fetchone()

        if(teams2):
            points=points+10

        cursor.execute('''SELECT footballpools.username AS username FROM footballpools INNER JOIN footballresults ON footballpools._idPartido = footballresults._idPartido && 
        footballpools.username = %s && footballpools.teamAScore = footballresults.teamAScore''',[index])
        teams3 = cursor.fetchone()

        cursor.execute('''SELECT footballpools.username AS username FROM footballpools INNER JOIN footballresults ON footballpools._idPartido = footballresults._idPartido && 
        footballpools.username = %s && footballpools.teamBScore = footballresults.teamBScore''',[index])
        teams4 = cursor.fetchone()

        if(teams4 and teams3):
            points=points+10
        
        cursor.execute('''SELECT pts FROM results WHERE  _idTournament=%s && username=%s ''',[_idTournament,index])
        found = cursor.fetchone()
        print(found)

        if(found):
            for pt in found:
                cursor.execute('''UPDATE results SET pts=%s WHERE username=%s && _idTournament=%s''',[pt+points,index,_idTournament])
                mysql.connection.commit()
        else:
            print(select)
            for indexPost in select:
                print(indexPost)
                _id='[value-1]'
                cursor.execute('''INSERT INTO results VALUES(%s,%s,%s,%s,%s)''',(_id,_idTournament,_idLiga,indexPost,points))
                mysql.connection.commit()
    cursor.close()
    return select

def setLigaDB(request):
    _idTournament=request.json['_idTournament']
    username=request.json['username']
    _idLiga=request.json['_idLiga']

    cursor= mysql.connection.cursor()
    cursor.execute('''UPDATE results SET _idLiga=%s WHERE username=%s && _idTournament=%s''',[_idLiga,username,_idTournament])
    mysql.connection.commit()
    return "Done"

def getLigaDB(username,_idTournament):

    cursor= mysql.connection.cursor()
    cursor.execute('''SELECT _idLiga FROM results WHERE username=%s && _idTournament=%s''',[username,_idTournament])
    found = cursor.fetchone()

    return found

def getRankingDB(username,_idTournament):

    cursor= mysql.connection.cursor()
    cursor.execute('''SELECT username,pts FROM results WHERE _idTournament =%s ORDER BY pts DESC''',[_idTournament])
    found= cursor.fetchall()
    load={}
    load['Ranking Global']=[]
    load['UserView']=[]
    for pool in found:
        
        cursor.execute('''SELECT users.username AS username, users.firstname AS firstname, users.lastname AS lastname, results.pts AS pts FROM users INNER JOIN results ON users.username=%s && results.username=%s && results._idTournament=%s''',[pool[0],pool[0],_idTournament])
        found= cursor.fetchall()
        load['Ranking Global'].append(found)
    position=0
    for index in load['Ranking Global']:
        for index2 in index: 
            print(index)
            if(index2[0]==username):
                load['UserPosition']=(position+1)
                load['UserView'].append(index2)
            else:
                position=position+1
            

    
    cursor.close()
    return load

def getRankingPrivateDB(username,_idTournament,_idLiga):

    cursor= mysql.connection.cursor()
    cursor.execute('''SELECT username,pts FROM results WHERE _idTournament =%s && _idLiga=%s ORDER BY pts DESC''',[_idTournament,_idLiga])
    found= cursor.fetchall()
    load={}
    load['Ranking Privado']=[]
    load['UserView']=[]
    for pool in found:
        
        cursor.execute('''SELECT users.username AS username, users.firstname AS firstname, users.lastname AS lastname, results.pts AS pts FROM users INNER JOIN results ON users.username=%s && results.username=%s && results._idLiga=%s''',[pool[0],pool[0],_idLiga])
        found= cursor.fetchall()
        load['Ranking Privado'].append(found)
    position=0
    for index in load['Ranking Privado']:
        for index2 in index: 
            print(index)
            if(index2[0]==username):
                load['UserPosition']=(position+1)
                load['UserView'].append(index2)
            else:
                position=position+1
            

    
    cursor.close()
    return load

def leaveRankingPrivateDB(request):
    _idPrivateTournament = request.json["_idPrivateTournament"]
    _idTournament = request.json["_idTournament"]
    Username = request.json["Username"]

    cursor= mysql.connection.cursor()

    cursor.execute('''SELECT * FROM results WHERE username=%s''',[Username])
    idtor=cursor.fetchone()

    cursor.execute(''' UPDATE results SET _idLiga=%s WHERE username=%s && _idLiga=%s''',["1",Username, _idPrivateTournament])

    mysql.connection.commit()
    cursor.close()

    return "Done"

def createPrivateLeagueDB(request):
    _idPrivateTournament = request.json["_idPrivateTournament"]
    _idTournament = request.json["_idTournament"]
    Username = request.json["Username"]

    cursor= mysql.connection.cursor()

    cursor.execute(''' UPDATE results SET _idLiga=%s WHERE username=%s && _idTournament=%s''',[_idPrivateTournament, Username, _idTournament])

    mysql.connection.commit()
    cursor.close()

    return "Done"

def joinPrivateLeagueDB(request):

    _idPrivateTournament = request.json["_idPrivateTournament"]
    _idTournament = request.json["_idTournament"]
    Username = request.json["Username"]

    cursor= mysql.connection.cursor()

    cursor.execute(''' SELECT _id FROM results WHERE username=%s''', [Username])
    users = cursor.fetchall()
    print("IDs:", users)

    if(len(users) == 0):
        cursor.execute(''' INSERT INTO results (_idTournament,_idLiga, username, pts) VALUES (%s,%s,%s,%s)''', [_idTournament,_idPrivateTournament, Username,"0"])
    else:
        cursor.execute(''' UPDATE results SET _idLiga=%s WHERE username=%s && _idTournament=%s''',[_idPrivateTournament, Username, _idTournament])

    mysql.connection.commit()
    cursor.close()

    return "Done"


