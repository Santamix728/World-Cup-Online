from app import *
from ConsultsDB.teamConsults import *


"""

Service complete

"""
@app.route('/getLocalTeams', methods = ['GET'])
def getLocalTeams():
    
    local=getLocals()

    return local

"""

Service complete

"""
@app.route('/getSelecTeams', methods = ['GET'])
def getSelecTeams():

   selections = getSelections()

   return selections