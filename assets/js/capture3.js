var video = document.querySelector('video');
var timer = new Timer();
var motionDetectionTime = [];

/*Capture de la webcam
*/
function captureCamera(callback) {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(function(camera) {
        callback(camera);
        //video.srcObject = camera;
    }).catch(function(error) {
        alert('Unable to capture your camera. Please check console logs.');
        console.error(error);
    });
}

/*Capture de l'écran
*/
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

/*Arrêt de l'enregistrement
*/
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

var recorder = {};
recorder.test = "test1";

/*Attribution de l'action du bouton d'enregistrement
*/
document.getElementById('btnPlay').onclick = function() {
    $('#video').toggle();
    $('#btnPlay').toggle();
    $('#btnStop').toggle();
    this.disabled = true;

/*Démarrage de l'enregistrement de la caméra et de l'écran
*/
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

/*Arrêt de l'enregistrement
*/
document.getElementById('btnStop').onclick = function() {
    this.disabled = true;
    console.log(motionDetectionTime.toString());
    console.log(recorder)
    //recorder.stopRecording(stopRecordingCallback);

    $('#video').css({'position':'static'});
    chaptersCreation();


    recorder.stopRecording(function() {
                var blob = recorder.getBlob();
                $('#btnSave').toggle();
                $('#btnUpload').toggle();
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

/*Bouton de sauvengarde de la vidéo en local
*/

document.getElementById('btnSave').onclick = function() {
                    if(!recorder) return alert('No recording found.');

                    var file = new File([recorder.getBlob()], 'fileRTC', {
                        type: 'video/webm'
                    });

                    invokeSaveAsDialog(file, file.name);
                };


/*Bouton d'upload de la vidéo sur le serveur
*/
$('#btnUpload2').click(function() {



                    var name = $('#inputTitre').val();
                    var desc = $('#inputDesc').val();

                    if(!recorder) return alert('No recording found.');

                    var file = new File([recorder.getBlob()], $('#inputTitre').val()+"|"+$('#inputDesc').val(), {
                        type: 'video/webm'
                    });

                    console.log(file)

                    var request = new XMLHttpRequest();

                    var formData = new FormData();
                    formData.append("thefile", file);


                    var url = "https://localhost:443/upload";
                    var method = "POST";
                    var shouldBeAsync = true;

                    request.onload = function () {
                        alert('upload done');
                    }

                    request.open(method, url, shouldBeAsync)
                    //request.setRequestHeader("Content-Type", "multipart/form-data;boundary=abc");
                    //request.send(file);
                    request.send(formData);
                    console.log(file);
});

/*Envoie du formulaire de connexion
*/
$('#send_login').click(function() {



                    var pseudo = $('#last_name_login').val();
                    var mdp = $('#password_login').val();


                    var request = new XMLHttpRequest();

                    request.onload = function () {
                        alert('connexion done');
                    }

                    request.open("POST", "https://localhost:443/login", true);
                    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    request.send("pseudo="+pseudo+"&mdp="+mdp+"");

});

