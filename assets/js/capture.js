/**
 * Created by Lucie on 24/10/2017.
 */
const video = document.getElementById('video');
var boutonPlay = document.getElementById('btnPlay');

function startup(){

    navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
    }).then(stream => {
        video.srcObject = stream;
    }).catch(console.error)
}

boutonPlay.addEventListener('click', startup);