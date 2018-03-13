$.getJSON( "/JSON/bdd.json", function( data ) {
  var items = [];


  console.log(data);

  for (var i = 0; i < data.videos.length; i++) {


    var myContent = $("<div>").addClass("myContentV");
    var myH2 = document.createElement('h3'); 
    var myVideo = $("#videoPlayer").clone();

    $(myVideo).eq(0).attr('src', "https://localhost:443/video/"+data.videos[i].titre);
    $(myVideo).eq(1).attr('src', "https://localhost:443/video/"+data.videos[i].titre);
    //var mySource1 = document.createElement('source');
    var mySource1 = $("<source>");
    console.log(mySource1)
    /*$(mySource1).attr('src', "https://localhost:443/video/"+data.videos[i].titre);
    mySource1.attr('type', "video/mp4");

    var mySource2 = $("<source>");
    $(mySource2).attr('src', "https://localhost:443/video/"+data.videos[i].titre);
    mySource2.attr('type', "video/webm");
    myVideo.append(mySource1)
    myVideo.append(mySource2)*/
    


    var myDesc = document.createElement('p');
    myH2.textContent = data.videos[i].titre;
    myDesc.textContent = data.videos[i].desc;

    myContent.append(myH2)
    myContent.append(myVideo)
    myContent.append(myDesc)

    $("#containerC").append(myContent);
    //$("#containerC").append(myVideo);
    //$("#containerC").append(myDesc);

  }
 
    
 
 /* $( "<ul/>", {
    "class": "my-new-list",
    html: items.join( "" )
  }).appendTo( "body" );*/
});