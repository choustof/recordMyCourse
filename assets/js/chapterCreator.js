var chapters;
function chaptersCreation(){
	var nb;
	chapters = '{ "chapitres" : [';
	for(var i = 1; i <= motionDetectionTime.length; i++){

		if(i == motionDetectionTime.length){
			chapters = chapters+'{ "titre":"Chapitre '+i+'" , "debut":"'+motionDetectionTime[i-1]+'" }';
		}
		else{
			chapters = chapters+'{ "titre":"Chapitre '+i+'" , "debut":"'+motionDetectionTime[i-1]+'" },';
		}
		
	}
	chapters = chapters+']}';
	console.log("LE TIMING"+chapters);
}

