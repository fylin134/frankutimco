// Packages
var express = require('express');
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');

var app = express();

var port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res)
{
	var fileName = path.join(__dirname, 'views/index.html');
	res.sendFile(fileName, function(err)
	{
		if(err)
		{
			console.log(err);
			res.status(err.status).end();
		}
		else
		{
			console.log('Index.html sent');
		}
	});
});

app.post('/upload', function(req, res){

	var testFile;

  	// create an incoming form object
  	var form = new formidable.IncomingForm();  
  	form.uploadDir = path.join(__dirname, '/uploads');

  	// rename when file is uploaded successfully
  	form.on('file', function(field, file) {
	    fs.rename(file.path, path.join(form.uploadDir, file.name));
	    testFile = file;
  	});

  	// log any errors that occur
  	form.on('error', function(err) {
	    console.log('An error has occured: \n' + err);
  	});
  
  	form.parse(req);

  	form.on('end', function() {       
	    res.end('' + doSomething(testFile));
  	});
});

function doSomething(file){
	return 'here is where we return our results' + file.name;
}

app.listen(port);
