#!/bin/bash
#Execute parser before all operation. If parser return false, the nest operation are not execute

npm run-script parser #execute parser.py with npm
#return code of python.py (if 0 no error, if 1 error)
if [ $? == 0 ]; 
then
    $@ #execute cmd of all param
else
	echo "libellID.json contains warning, so we can not continue to execute the other commands"
fi