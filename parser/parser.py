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

nbWeekOfFlyPeriod = 4
nbMounthOfFlyPeriod = 8

#Verif all number of criterias each dragonflies
for dragonflie in dragonflies:
    ############################CRITERIA########################################
    #get number of criterias in dragonflie and get name of dragonflies
    nbCriteriasDragonflie = len(dragonflie['criteria'])
    dragonflieName = str(dragonflie['commonName'].encode('utf-8'))

    #verif all number of crietrias each dragonflies as the same of number of total criterias
    if nbCriterias != nbCriteriasDragonflie:
        print(Color.BLUE+"Dragonflies "+dragonflieName+": "+Color.RED+"Warning, number of criterias as not correct\n\r")
        nbError=nbError+1

    #verif all number of value each criterias of dragonflies
    criteriasDragonflie = dragonflie['criteria']
    for idx,tupleCriteria in enumerate(criteriasDragonflie):

        #read tuple and check if the value are correct
        for valCriteria in tupleCriteria:
            if len(criterias[idx]['values'])<= valCriteria:#Warning, criteria xx is to high
                print(Color.BLUE+"Dragonflies "+dragonflieName+": "+Color.RED+"Warning, criteria "+ Color.YELLOW + str(idx)+'.'+criterias[idx]['name'] + Color.RED +" is too high \n\r")
                nbError=nbError+1


    ############################FLYPERIOD######################################
    #verif all number of value each flyperiod
    if ('flyPeriod' not in dragonflie.keys()):
        print(Color.BLUE+"Dragonflies "+dragonflieName+": "+Color.RED+"Warning, NO flyPeriod data found \n\r")
    else:
        flyPeriodDragonflie = dragonflie['flyPeriod']
        if(len(flyPeriodDragonflie)!=8):
            print(Color.BLUE+"Dragonflies "+dragonflieName+": "+Color.RED+"Warning, number of month in flyPeriod is not correct \n\r")
            nbError=nbError+1

        for tupleFlyPeriod in enumerate(flyPeriodDragonflie):
            if(len(tupleFlyPeriod[1]) != nbWeekOfFlyPeriod):
                print(Color.BLUE+"Dragonflies "+dragonflieName+": "+Color.RED+"Warning, number of week in flyPeriod is not correct \n\r")
                nbError=nbError+1

if nbError>0:
    print(Color.RED+"There are "+str(nbError)+" warning(s) in libellID.json \n\r")
    #exit(1) #exit with error
    print("ERROR")
else:
    print(Color.GREEN+"No warning in libellID.json : \n\r")
    print("NO_ERROR")
    #exit(0) #exit without any error
