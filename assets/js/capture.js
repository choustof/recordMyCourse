/**
 * Created by Lucie on 24/10/2017.
 */
const video = document.getElementById('video');
var buttonPlay = document.getElementById('btnPlay');
var buttonStop = document.getElementById('btnStop');

function startVideo(){

    navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
    }).then(stream => {
        video.srcObject = stream;
    }).catch(console.error)
    $('#video').toggle();
    $('#btnPlay').toggle();
    $('#btnStop').toggle();

}

function stopVideo(){

    video.stop();
    video = null;

}

buttonPlay.addEventListener('click', startVideo);
buttonStop.addEventListener('click', stopVideo);