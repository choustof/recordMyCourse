var fs = require('fs'),
    https = require('https'),
    http = require('http'),
    express = require('express'),
    app = express(),
    path = require("path");

var port = process.env.PORT || 443;

app.use(express.static(__dirname + '/assets'));

    app.get('/', function (req, res) {
    	res.sendFile(path.join(__dirname+'/index3.html'));
    });
    app.get('/about.html', function (req, res) {
        res.sendFile(path.join(__dirname+'/about.html'));
    });
    app.get('/contact.html', function (req, res) {
        res.sendFile(path.join(__dirname+'/contact.html'));
    });


if(port == 443){
    https.createServer({
        key: fs.readFileSync('hostkey.pem'),
        cert: fs.readFileSync('hostcert.pem')
    }, app).listen(port, function() {
            console.log('DEV Listening on ' + port);
        });
}
else{
    http.createServer(app).listen(port, function() {
        console.log('HEROKU Listening on ' + port);
    });
}