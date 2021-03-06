/**
 * Created by Lucie on 24/10/2017.
 */
var video = document.getElementById('video');
var buttonPlay = document.getElementById('btnPlay');
var buttonStop = document.getElementById('btnStop');
var streamAudio;
var streamVideo;

function startVideo(){

    navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
    }).then(stream => {
        video.srcObject = stream;
        streamAudio = stream.getTracks()[0];
        streamVideo = stream.getTracks()[1];
        
        video.play();
        
    }).catch(console.error);

    $('#video').toggle();
    $('#btnPlay').toggle();
    $('#btnStop').toggle();

}

function stopVideo(){
    console.log(streamAudio)
    console.log(streamVideo)
    console.log(video.srcObject)




    streamAudio.stop(); 
    streamVideo.stop();
    $('#video').toggle();
    $('#btnPlay').toggle();
    $('#btnStop').toggle();

    window.scrollTo(0,0); 
}

buttonPlay.addEventListener('click', startVideo);
buttonStop.addEventListener('click', stopVideo);