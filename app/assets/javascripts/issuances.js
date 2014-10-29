var ready;
ready = function() {  
	$('#activate_scanner').click(function(){
		$("#webcam_employee").scriptcam({
			path: '/assets/',
			width: 320,
			height: 240,
			onError:onError,
			cornerRadius:0,
			onWebcamReady:onWebcamReady
		});

		var refreshScanner = setInterval(function(){
			var decodeValue = $.scriptcam.getBarCode();
			console.log(decodeValue);
			if(!!decodeValue) {
				clearInterval(refreshScanner);
				$('#issuance_incoming_employee_barcode').attr('value', decodeValue);
				playasound();
				$('#webcam_employee').remove();
				$('#webcam_employee_placeholder').append("<div id=\"webcam_employee\"></div>");
				alert("Scan success!");
			}
		}, 1000);
	});

	$('#activate_scanner_tool').click(function(){
		var id = $('#tool_barcode').attr('for');
		console.log(id)
		$("#webcam_tool").scriptcam({
			path: '/assets/',
			width: 320,
			height: 240,
			onError:onError,
			cornerRadius:0,
			onWebcamReady:onWebcamReady
		});

		var refreshScanner = setInterval(function(){
			var decodeValue = $.scriptcam.getBarCode();
			console.log(decodeValue);
			if(!!decodeValue) {
				clearInterval(refreshScanner);
				$("#" + id).attr('value', decodeValue);
				playasound();
				$('#webcam_tool').remove();
				$('#webcam_placeholder').append("<div id=\"webcam\"></div>");
				alert("Scan success!");
			}
		}, 1000);
	});
}
$(document).ready(ready);
$(document).on('page:load', ready);



function playasound() {
	$.scriptcam.playMP3("/assets/ding.mp3");
}					

function onError(errorId,errorMsg) {
	alert(errorMsg);
}

function changeCamera() {
	$.scriptcam.changeCamera($('#cameraNames').val());
}

function onWebcamReady(cameraNames,camera,microphoneNames,microphone,volume) {
	$.each(cameraNames, function(index, text) {
		$('#cameraNames').append( $('<option></option>').val(index).html(text) )
	}); 
	$('#cameraNames').val(camera);
}
