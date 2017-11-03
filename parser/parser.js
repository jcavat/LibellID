var path="parser/parser.py"
var PythonShell = require('python-shell');

var pyshell = new PythonShell(path);
 
pyshell.on('message', function (message) {
  // received a message sent from the Python script (a simple "print" statement)
  if(message=="ERROR"){
    console.log("ERROR")
    process.exit(1);
  }else if(message =="NO_ERROR"){
    console.log("NO_ERROR");
    process.exit(0);
  }else{
    console.log(message);
  }
});

