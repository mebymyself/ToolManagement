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
			width: 570,
			height: 380,
			onError:onError,
			cornerRadius:0,
			onWebcamReady:onWebcamReady,
			// readBarCodes:'CODE_128,QR_CODE,CODE_39'
		});

		var refreshScanner = setInterval(function(){
			var decodeValue = $.scriptcam.getBarCode();
			if(!!decodeValue) {
				clearInterval(refreshScanner);
				$('#issuance_incoming_employee_barcode').val(decodeValue)
				$('#webcam_employee').remove();
				$('#webcam_employee_placeholder').append("<div id=\"webcam_employee\"></div>");
				$('#myModal').modal('hide');
				employeeModal();
				$('#employeeSearchModal').modal('show');
			}
		}, 500);
	});

	$('.activate_scanner_tool').click(
		function(){
		var id = $('#tool_barcode').attr('for');
		console.log(id)
		// $('#webcam_tool').attr('id', 'webcam_tool' + id)
		// $("#webcam_tool" + id).scriptcam({
			$('#webcam_tool').scriptcam({
				path: '/assets/',
				width: 570,
				height: 380,
				onError:onError,
				cornerRadius:0,
				onWebcamReady:onWebcamReady,
			});

			refreshScanner = setInterval(function(){
				var decodeValue = $.scriptcam.getBarCode();
				if(!!decodeValue) {
					clearInterval(refreshScanner);
					$("#" + id).attr('value', decodeValue);
					$("#webcam_tool").remove();
					$('#webcam_tool_placeholder').append("<div id=\"webcam_tool\"></div>");
					$('#toolModal').modal('hide');
				};
			}, 500);
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
					width: 570,
					height: 380,
					onError:onError,
					cornerRadius:0,
					onWebcamReady:onWebcamReady,
				});

				var refreshScanner = setInterval(function(){
					var decodeValue = $.scriptcam.getBarCode();
					if(!!decodeValue) {
						clearInterval(refreshScanner);
						$("#" + id).attr('value', decodeValue);
						$("#webcam_tool").remove();
						$('#webcam_tool_placeholder').append("<div id=\"webcam_tool\"></div>");
						$('#tool_barcode').attr('id', '#tool_barcode'+id)
						$('#toolModal').modal('hide');
					}
				}, 500);
			}
		);
	});

	// Inserting signature-pad
	$('.sigPad').signaturePad({drawOnly:true});

}
$(document).ready(ready);
$(document).on('page:load', ready);

					

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

