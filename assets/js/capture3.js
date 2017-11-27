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
    console.log(recorder)
    recorder.camera.stop();
    recorder.destroy();
    recorder = null;
    console.log(recorder);
}


var recorder = {}; // globally accessible
recorder.test = "test1";

document.getElementById('btnPlay').onclick = function() {
    $('#video').toggle();
    $('#btnPlay').toggle();
    $('#btnStop').toggle();
    this.disabled = true;







captureScreen(function(screen) {
    captureCamera(function(camera) {

        screen.width = window.screen.width - 350;
        screen.height = window.screen.height - 300;
        screen.fullcanvas = true;
        
        camera.width = 320;
        camera.height = 240;
        camera.top = screen.height - camera.height;
        camera.left = screen.width - camera.width;
        
        recorder = RecordRTC([screen, camera], {
            type: 'video',
            mimeType: 'video/webm'
        });

        recorder.startRecording();
        recorder.camera = camera;
        console.log(this)

        /*setTimeout(function() {
            recorder.stopRecording(function() {
                var blob = recorder.getBlob();
                document.querySelector('video').src = URL.createObjectURL(blob);
                document.querySelector('video').muted = false;

                [screen, camera].forEach(function(stream) {
                    stream.getVideoTracks().forEach(function(track) {
                        track.stop();
                    });

                    stream.getAudioTracks().forEach(function(track) {
                        track.stop();
                    });
                })
            });
        }, 9 * 1000);*/
    });
});









/*

    screen.width = window.screen.width;
        screen.height = window.screen.height;
        screen.fullcanvas = true;
    captureCamera(function(camera) {
        setSrcObject(camera, video);
        video.play();
        console.log(camera)
        console.log(video)
        recorder = RecordRTC([camera], {
            type: 'video'
        });
        recorder.startRecording();
        // release camera on stopRecording
        recorder.camera = camera;
        document.getElementById('btnStop').disabled = false;
    });*/

    
};
document.getElementById('btnStop').onclick = function() {
    this.disabled = true;
    console.log(recorder)
    //recorder.stopRecording(stopRecordingCallback);


    recorder.stopRecording(function() {
                var blob = recorder.getBlob();
                $('#btnSave').toggle();
                $('#btnStop').toggle();
                document.querySelector('video').src = URL.createObjectURL(blob);
                document.querySelector('video').muted = false;

                [screen, camera].forEach(function(stream) {
                    stream.getVideoTracks().forEach(function(track) {
                        track.stop();
                    });

                    stream.getAudioTracks().forEach(function(track) {
                        track.stop();
                    });
                })
            });
};


document.getElementById('btnSave').onclick = function() {
                    if(!recorder) return alert('No recording found.');

                    var file = new File([recorder.getBlob()], 'fileRTC', {
                        type: 'video/webm'
                    });

                    invokeSaveAsDialog(file, file.name);
                };