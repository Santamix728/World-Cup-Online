from app import MYSQL

mysql=MYSQL



def createPoolDB(request):

    
    _idPartido = request.json['matchID']
    winner = request.json['winner']
    teamAScore= request.json['teamAScore']
    teamBScore= request.json['teamBScore']
    mvpGame=request.json['MVP']
    goalA=request.json['goalA']
    goalB=request.json['goalB']
    assistA=request.json['assistA']
    assistB=request.json['assistB']
    username=request.json['username']
    _id='[value-1]'

    cursor= mysql.connection.cursor()
    cursor.execute('''SELECT * FROM  footballpools WHERE _idPartido=%s && username=%s''',(_idPartido,username))
    found=cursor.fetchone()
    ret="Insertado correctamente"
    if(found):
        ret="Error, ya se realizó la quiniela"
    else:

        cursor.execute('''INSERT INTO footballpools VALUES(%s,%s,%s,%s,%s,%s,%s)''',(_id,_idPartido,winner,mvpGame,teamAScore,teamBScore,username))
        mysql.connection.commit()
        

        i = 0
        for goalInsertA in goalA:

            
            cursor.execute('''INSERT INTO goalsplayerpool VALUES(%s,%s,%s,%s)''',(_id,_idPartido, goalInsertA, "teamA"))
            mysql.connection.commit()
            
            i+=1

        for goalInsertB in goalB:

        
            cursor.execute('''INSERT INTO goalsplayerpool VALUES(%s,%s,%s,%s)''',(_id,_idPartido, goalInsertB,"teamB"))
            mysql.connection.commit()
            
            i+=1

        j = 0
        for assitInsertA in assistA:

        
            cursor.execute('''INSERT INTO assistplayerpool VALUES(%s,%s,%s,%s)''',(_id,_idPartido , assitInsertA,"teamA"))
            mysql.connection.commit()
        
            j+=1

        for assitInsertB in assistB:

            
            cursor.execute('''INSERT INTO assistplayerpool VALUES(%s,%s,%s,%s)''',(_id,_idPartido , assitInsertB,"teamB"))
            mysql.connection.commit()
            
            j+=1

    cursor.close()
    return ret

def getPoolDB():

    cursor= mysql.connection.cursor()
    cursor.execute('''SELECT * FROM footballpools''')
    pools = cursor.fetchall()

    load={}
    load['Pools']=[]

    for pool in pools:
        load['Pools'].append(pool[0])

    cursor.close()
    return load

def getGoalPoolDB():

    cursor= mysql.connection.cursor()
    cursor.execute('''SELECT * FROM goalsplayerpool''')
    pools = cursor.fetchall()
    print(pools)

    load={}
    load['GoalsPools']=[]

    for pool in pools:
        load['GoalsPools'].append(pool[0])

    cursor.close()
    return load

def getAssistPoolDB():

    cursor= mysql.connection.cursor() 
    cursor.execute('''SELECT * FROM assistplayerpool''')
    pools = cursor.fetchall()

    load={}
    load['AssistPools']=[]

    for pool in pools:
        load['AssistPools'].append(pool[0])

    cursor.close()
    return load