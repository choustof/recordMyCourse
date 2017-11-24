var video = document.querySelector('video');

function captureCamera(callback) {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(function(camera) {
        callback(camera);
    }).catch(function(error) {
        alert('Unable to capture your camera. Please check console logs.');
        console.error(error);
    });
}

function captureScreen(cb) {
    getScreenId(function (error, sourceId, screen_constraints) {
        navigator.mediaDevices.getUserMedia(screen_constraints).then(cb).catch(function(error) {
          console.error('getScreenId error', error);
          alert('Failed to capture your screen. Please check Chrome console logs for further information.');
        });
    });
}
function stopRecordingCallback() {

    $('#btnStop').toggle();
    video.src = video.srcObject = null;
    video.src = URL.createObjectURL(recorder.getBlob());
    video.play();
    recorder.camera.stop();
    recorder.destroy();
    recorder = null;
}


var recorder; // globally accessible

document.getElementById('btnPlay').onclick = function() {
    $('#video').toggle();
    $('#btnPlay').toggle();
    $('#btnStop').toggle();
    this.disabled = true;

    screen.width = window.screen.width;
        screen.height = window.screen.height;
        screen.fullcanvas = true;
    captureCamera(function(camera) {
        setSrcObject(camera, video);
        video.play();
        recorder = RecordRTC([screen,camera], {
            type: 'video'
        });
        recorder.startRecording();
        // release camera on stopRecording
        recorder.camera = camera;
        document.getElementById('btnStop').disabled = false;
    });

    
};
document.getElementById('btnStop').onclick = function() {
    this.disabled = true;
    recorder.stopRecording(stopRecordingCallback);
};