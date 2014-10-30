var ready;
ready = function() {  

	// JavaScript for dataTable applied to issuance_index
	$('#issuance-table').dataTable({
		"columnDefs": [{
			"targets": 4,
			"orderable": false
		}]
	});

	// JavaScript for scanning barcode
	$('#activate_scanner').click(function(){
		$("#webcam_employee").scriptcam({
			path: '/assets/',
			width: 320,
			height: 240,
			onError:onError,
			cornerRadius:0,
			onWebcamReady:onWebcamReady,
			// readBarCodes:'CODE_128,QR_CODE,CODE_39'
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

	$('.activate_scanner_tool').click(
		function(){
		alert('loading camera');
		var id = $('#tool_barcode').attr('for');
		console.log(id)
		// $('#webcam_tool').attr('id', 'webcam_tool' + id)
		// $("#webcam_tool" + id).scriptcam({
			$('#webcam_tool').scriptcam({
				path: '/assets/',
				width: 320,
				height: 240,
				onError:onError,
				cornerRadius:0,
				onWebcamReady:onWebcamReady,
			});

			var refreshScanner = setInterval(function(){
				var decodeValue = $.scriptcam.getBarCode();
				console.log(decodeValue);
				if(!!decodeValue) {
					clearInterval(refreshScanner);
					$("#" + id).attr('value', decodeValue);
					playasound();
					$("#webcam_tool").remove();
					$('#webcam_tool_placeholder').append("<div id=\"webcam_tool\"></div>");
					alert("Scan success!");
				}
			}, 1000);
		}
	);

	$(document).on('cocoon:before-insert',function(){
		$('#tool_barcode').attr('id', "nil")
	});

	$(document).on('cocoon:after-insert',function(){
		$('.activate_scanner_tool').click(
			function(){
			var id = $('#tool_barcode').attr('for');
			console.log(id)
			// $('#webcam_tool').attr('id', 'webcam_tool' + id)
			// $("#webcam_tool" + id).scriptcam({
				$('#webcam_tool').scriptcam({
					path: '/assets/',
					width: 320,
					height: 240,
					onError:onError,
					cornerRadius:0,
					onWebcamReady:onWebcamReady,
				});

				var refreshScanner = setInterval(function(){
					var decodeValue = $.scriptcam.getBarCode();
					console.log(decodeValue);
					if(!!decodeValue) {
						clearInterval(refreshScanner);
						$("#" + id).attr('value', decodeValue);
						playasound();
						$("#webcam_tool").remove();
						$('#webcam_tool_placeholder').append("<div id=\"webcam_tool\"></div>");
						$('#tool_barcode').attr('id', '#tool_barcode'+id)
						alert("Scan success!");
					}
				}, 1000);
			}
		);
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

