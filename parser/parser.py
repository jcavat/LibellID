from __future__ import print_function #allow to run with python 2.7 and python 3
import json
from pprint import pprint


class Color:
   BLUE = '\033[94m'
   GREEN = '\033[92m'
   YELLOW = '\033[93m'
   RED = '\033[91m'


#Open JSON File
with open('./src/assets/data/libellID.json') as data_file:
    data = json.load(data_file)

#Length of criterias
criterias = data['criteria']
nbCriterias = len(data['criteria'])
dragonflieName=""
dragonflies = data['dragonflies']
nbError=0

#Verif all number of criterias each dragonflies
for dragonflie in dragonflies:
    #get number of criterias in dragonflie and get name of dragonflies
    nbCriteriasDragonflie = len(dragonflie['criteria'])
    dragonflieName = str(dragonflie['commonName'].encode('utf-8'))

    #verif all number of crietrias each dragonflies as the same of number of total criterias
    if nbCriterias != nbCriteriasDragonflie:
        print(Color.BLUE+"Dragonflies "+dragonflieName+":"+Color.RED+"Warning, number of criterias as not correct\r\n")
        nbError=nbError+1

    #verif all number of value each criterias of dragonflies
    criteriasDragonflie = dragonflie['criteria']
    for idx,tupleCriteria in enumerate(criteriasDragonflie):

        #read tuple and check if the value are correct
        for valCriteria in tupleCriteria:
            if len(criterias[idx]['values'])<= valCriteria:#Warning, criteria xx is to high
                print(Color.BLUE+"Dragonflies "+dragonflieName+":"+Color.RED+" Warning, criteria "+ Color.YELLOW + str(idx)+'.'+criterias[idx]['name'] + Color.RED +" is too high\r\n")
                nbError=nbError+1
if nbError>0:
    print(Color.RED+"They are "+str(nbError)+" warning")
else:
    print(Color.GREEN+"No warning! :)")
