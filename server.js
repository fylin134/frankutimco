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

app.post('/upload', function(req, res)
{

	var testFile;

  	// create an incoming form object
  	var form = new formidable.IncomingForm();  
  	form.uploadDir = path.join(__dirname, '/uploads');

  	// rename when file is uploaded successfully
  	form.on('file', function(field, file) 
  	{
	    fs.rename(file.path, path.join(form.uploadDir, file.name));
	    testFile = file;
  	});

  	// log any errors that occur
  	form.on('error', function(err) 
  	{
	    console.log('An error has occured: \n' + err);
  	});
  
  	form.parse(req);

  	form.on('end', function() 
  	{
  		var resultJSON = doSomething(testFile);
	    res.end(JSON.stringify(resultJSON));
  	});
});

function doSomething(file)
{
	var uploadDir = path.join(__dirname, 'uploads');
	var jsonArr = JSON.parse(fs.readFileSync(path.join(uploadDir, file.name), 'utf8'));
	
	var resultsObj = {"results": []};

	for(var i = 0; i < jsonArr.length; i++)
	{
		var menu = jsonArr[i].menu;
		if(menu != null)
		{
			var items = menu.items;
			// ***ASSUMPTION ***
			// No reason to display an error message, just check for nulls
			// since we can still sum the rest of the items
			if(items != null)
			{
				var itemsSum = 0;						
				for(var j = 0; j < items.length; j++)
				{
					var item = items[j];
					if(item != null){
						if(item.label != undefined){
							itemsSum += item.id;
						}
					}
				}
				resultsObj.results.push(itemsSum);
				console.log('pushed ' + itemsSum);
			}
		}		
	}

	return resultsObj;
}

app.listen(port);
