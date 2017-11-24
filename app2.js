var fs = require('fs'),
    https = require('https'),
    express = require('express'),
    app = express(),
    path = require("path");

app.use(express.static(__dirname + '/assets'));

    app.get('/', function (req, res) {
    	res.sendFile(path.join(__dirname+'/index3.html'));
    });

    https.createServer({
      key: fs.readFileSync('hostkey.pem'),
      cert: fs.readFileSync('hostcert.pem')
    }, app).listen(443);

    console.log("Running at Port 443");