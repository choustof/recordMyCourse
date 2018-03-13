var video = document.querySelector('video');
var timer = new Timer();
var motionDetectionTime = [];

function captureCamera(callback) {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(function(camera) {
        callback(camera);
        //video.srcObject = camera;
    }).catch(function(error) {
        alert('Unable to capture your camera. Please check console logs.');
        console.error(error);
    });
}

function captureScreen(cb) {
    getScreenId(function (error, sourceId, screen_constraints) {
        navigator.mediaDevices.getUserMedia(screen_constraints).then(function(screen){
            cb(screen);
            video.srcObject = screen;

        }).catch(function(error) {
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
    
}


var recorder = {}; // globally accessible
recorder.test = "test1";

document.getElementById('btnPlay').onclick = function() {
    $('#video').toggle();
    $('#btnPlay').toggle();
    $('#btnStop').toggle();
    this.disabled = true;

  
   // $('#video').css({'position':'absolute'});

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


        timer.start({precision: 'secondTenths'});
timer.addEventListener('secondsUpdated', function (e) {
    console.log(timer.getTimeValues().toString());


});
        console.log(this)

    });
});

    
};

document.getElementById('btnStop').onclick = function() {
    this.disabled = true;
    console.log(motionDetectionTime.toString());
    console.log(recorder)
    //recorder.stopRecording(stopRecordingCallback);

    $('#video').css({'position':'static'});


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