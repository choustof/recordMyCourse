var video = document.querySelector('video');
function captureCamera(callback) {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(function(camera) {
        callback(camera);
    }).catch(function(error) {
        alert('Unable to capture your camera. Please check console logs.');
        console.error(error);
    });
}
function stopRecordingCallback() {
    video.src = video.srcObject = null;
    video.src = URL.createObjectURL(recorder.getBlob());
    video.play();
    recorder.camera.stop();
    recorder.destroy();
    recorder = null;
}
var recorder; // globally accessible
document.getElementById('btnPlay').onclick = function() {
    this.disabled = true;
    captureCamera(function(camera) {
        setSrcObject(camera, video);
        video.play();
        recorder = RecordRTC(camera, {
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