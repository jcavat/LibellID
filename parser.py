import json
from pprint import pprint

class Color:
   PURPLE = '\033[95m'
   BLUE = '\033[94m'
   GREEN = '\033[92m'
   YELLOW = '\033[93m'
   RED = '\033[91m'


#Open JSON File
with open('src/assets/data/libellID(copie).json') as data_file:    
    data = json.load(data_file)

#Length of criterias
criterias = data['criteria']
nbCriterias = len(data['criteria'])
dragonflieName=""
dragonflies = data['dragonflies']

#Verif all number of criterias each dragonflies 
for dragonflie in dragonflies:
    #get number of criterias in dragonflie and get name of dragonflies
    nbCriteriasDragonflie = len(dragonflie['criteria'])
    dragonflieName = str(dragonflie['commonName'].encode('utf-8'))

    #verif all number of crietrias each dragonflies as the same of number of total criterias
    if nbCriterias == nbCriteriasDragonflie:
        print Color.GREEN+"Dragonflies "+dragonflieName+":\t Number of criterias as ok\r\n"
    else:
        print Color.RED+"Dragonflies "+dragonflieName+":\t Warning, number of criterias as not correct\r\n"

    criteriasDragonflie = dragonflie['criteria']
    #verif all number of value each criterias of dragonflies
    for idx,tupleCriteria in enumerate(criteriasDragonflie):
        #read tuple and check if the value are correct
        for valCriteria in tupleCriteria:
            if len(criterias[idx]['values'])>= valCriteria:
                print Color.GREEN+"print ok"
            else:
                print Color.RED+"pas ok"
        print "\r\n"
    print "\r\n"