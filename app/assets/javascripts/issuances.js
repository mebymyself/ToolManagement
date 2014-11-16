var ready;
ready = function() {  
	
	// Set hooks for tool_barcode input and due_date
	toolInputId = $('#tool_barcode').attr('for');
	dueDateInputId = $('#due_date').attr('for');

	// JavaScript for dataTable applied to issuance_index
	$('#issuance-table').DataTable ({
		"responsive": true,
		"columnDefs": [{
			"targets": 4,
			"orderable": false
		}]
	});

	// JavaScript for scanning employee barcode
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
				// $('#webcam_employee').remove();
				// $('#webcam_employee_placeholder').append("<div id=\"webcam_employee\"></div>");
				$('#myModal').modal('hide');
				employeeModal();
				$('#employeeSearchModal').modal('show');
			}
		}, 500);
	});

	$('#activate_scanner_tool').click(
		function(){
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
					$('#toolModal').modal('hide');
					toolModal();
					$('#toolSearchModal').modal('show');
				};
			}, 500);
		}
	);

		$('#search-tool').click(function(){
			event.preventDefault();
			toolModal();
		});

		$('.cancel_tool').click(function(){
			toolSearchReset();
		})

		$('.invalid_search').click(function(){
			toolSearchReset();
		})

		$('#confirm_tool').click(function(){
			setTimeout(function(){
				$('#confirm_tool').show();
				$('.cancel_tool').show();
				$('.invalid_search').show();
			}, 500);
		})

	function toolModal(){
		var searchValue = $('#' + toolInputId).val()
		$.getJSON('/tools?search=' + searchValue)
			.done(function(data){
				console.log(searchValue);
				if (data.length !== 1) {
					$('#tool_barcode_field').text("Record not found");
					$('#tool_pic').attr('src', "/assets/unavailable.png");
					$('#tool_description').text("Record not found");
					$('#tool_quantity').text("Record not found");
					$('#tool_notes').text("Record not found");
					$('#tool_updated_at').text("Record not found");	
					$('#confirm_tool').hide();
					$('.cancel_tool').hide();
				} else {
					// $('#issuance_incoming_tool_barcode').val(data[0].barcode);
					$('#' + toolInputId).val(data[0].barcode)
					$('#tool_barcode_field').text(data[0].barcode);
					$('#tool_pic').attr('src', data[0].image_url);
					$('#tool_description').text(data[0].description);
					$('#tool_quantity').text(data[0].quantity_on_hand + "/" + data[0].quantity);
					$('#tool_notes').text(data[0].notes);
					$('#tool_updated_at').text(data[0].updated_at);	
					$('.invalid_search').hide();

				};
		})
	}

	function toolSearchReset(){
		$('#' + toolInputId).val('');
		$('#tool_barcode_field').text("")
		$('#tool_pic').attr('src', "");
		$('#tool_description').text("");
		$('#tool_quantity').text("");
		$('#tool_notes').text("");
		$('#tool_updated_at').text("");
		setTimeout(function(){
			$('#confirm_tool').show();
			$('.cancel_tool').show();
			$('.invalid_search').show();
			
		}, 500);
	}

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
		
		$('#activate_scanner_tool').click(
			function(){
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
						$("#" + toolInputId).attr('value', decodeValue);
						$('#toolModal').modal('hide');
						toolModal();
						$('#toolSearchModal').modal('show');
						$('#tool_barcode').attr('id', '#tool_barcode' + '-' + toolInputId);
					}
				}, 500);
			}
		);
		// tool lookup, a modal with searched tool will popup
			$('#search-tool').click(function(){
				event.preventDefault();
				toolModal();
			});

			$('.cancel_tool').click(function(){
				toolSearchReset();
			})

			$('.invalid_search').click(function(){
				toolSearchReset();
			})

			$('#confirm_tool').click(function(){
				setTimeout(function(){
					$('#confirm_tool').show();
					$('.cancel_tool').show();
					$('.invalid_search').show();
				}, 500);
			})

		function toolModal(){
			var searchValue = $('#' + toolInputId).val()
			console.log(searchValue);
			$.getJSON('/tools?search=' + searchValue)
				.done(function(data){
					if (data.length !== 1) {
						$('#tool_barcode_field').text("Record not found");
						$('#tool_pic').attr('src', "/assets/unavailable.png");
						$('#tool_description').text("Record not found");
						$('#tool_quantity').text("Record not found");
						$('#tool_notes').text("Record not found");
						$('#tool_updated_at').text("Record not found");	
						$('#confirm_tool').hide();
						$('.cancel_tool').hide();
					} else {
						$('#' + toolInputId).val(data[0].barcode)
						$('#tool_barcode_field').text(data[0].barcode);
						$('#tool_pic').attr('src', data[0].image_url);
						$('#tool_description').text(data[0].description);
						$('#tool_quantity').text(data[0].quantity_on_hand + "/" + data[0].quantity);
						$('#tool_notes').text(data[0].notes);
						$('#tool_updated_at').text(data[0].updated_at);	
						$('.invalid_search').hide();

					};
			})
		}

		function toolSearchReset(){
			$('#' + toolInputId).val('');
			$('#tool_barcode_field').text("")
			$('#tool_pic').attr('src', "");
			$('#tool_description').text("");
			$('#tool_quantity').text("");
			$('#tool_notes').text("");
			$('#tool_updated_at').text("");
			setTimeout(function(){
				$('#confirm_tool').show();
				$('.cancel_tool').show();
				$('.invalid_search').show();
				
			}, 500);
		}

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

