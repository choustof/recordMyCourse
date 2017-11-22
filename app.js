var https = require('https');  
var fs = require('fs');  
   
var options = {  
  key: fs.readFileSync('hostkey.pem'),  
  cert: fs.readFileSync('hostcert.pem')  
};  

fs.readFile('./index.html', function (err, html) {
    if (err) throw err; 
   
	https.createServer(options, function (req, res) {  
	 res.writeHead(200, {"Content-Type": "text/html"});  
	 res.write(html);  
	  res.end("hello world\n");  
	}).listen(430);
});