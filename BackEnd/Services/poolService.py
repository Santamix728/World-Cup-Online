from app import *
from ConsultsDB.poolConsults import *

"""

Service complete

"""
@app.route('/createPools', methods = ['POST'])
def createPools():

    response=createPoolDB(request)


    return response

"""

Service complete

"""
@app.route('/getPools', methods = ['GET'])
def getPools():

    response=getPoolDB()


    return response


"""

Service complete

"""
@app.route('/getGoalPools', methods = ['GET'])
def getGoalPools():

    response=getGoalPoolDB()


    return response

"""

Service complete

"""
@app.route('/getAssistPools', methods = ['GET'])
def getAssistPools():

    response=getAssistPoolDB()


    return response