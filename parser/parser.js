var PythonShell = require('python-shell');
 
PythonShell.run('parser/parser.py', function (err, results) {
  if (err) throw err;
  console.log('Results of parser: \n\r%s', results);
});
