var ready;
ready = function() {  
	
	// Set hooks for tool_barcode input and due_date
	toolInputId = $('#tool_barcode').attr('for');
	dueDateInputId = $('#due_date').attr('for');

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

	$('#activate_scanner_tool').click(
		function(){
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
					$("#" + toolInputId).attr('value', decodeValue);
					// $("#webcam_tool").remove();
					// $('#webcam_tool_placeholder').append("<div id=\"webcam_tool\"></div>");
					$('#toolModal').modal('hide');
				};
			}, 500);
		}
	);

	$(document).on('cocoon:before-insert',function(){
		$('#' + toolInputId).attr('disabled', 'true');
		$('#' + dueDateInputId).attr('disabled', 'true');
		$('#activate_scanner_tool').attr('disabled', true);
		$('#search-tool').attr('disabled', true);	

		// remove hook from pervious line_item
		$('#tool_barcode').attr('id', '');
		$('#due_date').attr('id', '');
		$('#activate_scanner_tool').attr('id', '');
		$('#search-tool').attr('id', '');
	});

	$(document).on('cocoon:after-insert',function(){

		// Set hooks for tool_barcode input and due_date
		toolInputId = $('#tool_barcode').attr('for');
		dueDateInputId = $('#due_date').attr('for');
		
		$('.activate_scanner_tool').click(
			function(){
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

