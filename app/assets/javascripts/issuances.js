var ready;
ready = function() {  
	$('#activate_scanner').click(function(){
		$("#webcam").scriptcam({
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
				$('#webcam').remove();
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
