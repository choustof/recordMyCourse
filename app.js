const https = require("https");
const fs = require("fs");
const LISTEN_PORT = 5678;
 
const options = {
	"key": fs.readFileSync("/encryption/private.key"),
	"cert": fs.readFileSync("/encryption/primary.crt")
};
 
const app = https.createServer(options).listen(LISTEN_PORT);
log("Http server launched");