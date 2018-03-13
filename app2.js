var fs = require('fs'),
    https = require('https'),
    express = require('express'),
    app = express(),
    path = require("path"),
    upload = require("express-fileupload");

app.use(upload());

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


app.post('/upload',function(req,res){
  console.log(req.files);
  
  if(req.files.thefile){
    var file = req.files.thefile,
      name = file.name.split("|")[0],
      desc = file.name.split("|")[1],
      type = file.mimetype;

      console.log(desc);
    var uploadpath = __dirname + '/videos/' + name;
   /* if(fs.existsSync(uploadpath)){
        console.log("File name Failed");
        res.send("File name Error Occured!")
    }*/

    file.mv(uploadpath,function(err){
      if(err){
        console.log("File Upload Failed",name,err);
        res.send("Error Occured!")
      }
      else {
        console.log("File Uploaded",name);
        res.send('Done! Uploading files');

        addVideoToJSON({titre: name,desc:desc});
      }
    });
  }
  else {
    res.send("No File selected !");
    res.end();
  };
})





app.get('/video/:id?', function(req, res) {

    if(req.params.id){

      const path = 'videos/'+req.params.id;
      const stat = fs.statSync(path)
      const fileSize = stat.size
      const range = req.headers.range

      if (range) {
        const parts = range.replace(/bytes=/, "").split("-")
        const start = parseInt(parts[0], 10)
        const end = parts[1]
          ? parseInt(parts[1], 10)
          : fileSize-1

        const chunksize = (end-start)+1
        const file = fs.createReadStream(path, {start, end})
        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'video/mp4',
        }

        res.writeHead(206, head)
        file.pipe(res)
      } else {
        const head = {
          'Content-Length': fileSize,
          'Content-Type': 'video/mp4',
        }
        res.writeHead(200, head)
        fs.createReadStream(path).pipe(res)
      }

    }
  
})

function addVideoToJSON(dataVideo){
    fs.readFile('./assets/JSON/bdd.json', 'utf-8', function(err, data) {
    if (err) throw err

    var arrayOfObjects = JSON.parse(data)
    arrayOfObjects.videos.push({
        titre: dataVideo.titre,
        desc: dataVideo.desc
    })
    console.log(dataVideo);

    console.log(arrayOfObjects)

    fs.writeFile('./assets/JSON/bdd.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
        if (err) throw err
        console.log('Done!')
    })
})
}


    https.createServer({
      key: fs.readFileSync('hostkey.pem'),
      cert: fs.readFileSync('hostcert.pem')
    }, app).listen(443);

    console.log("Running at Port 443");