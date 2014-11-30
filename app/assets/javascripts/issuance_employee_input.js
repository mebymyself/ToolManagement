var ready;
ready = function() {  
	
	// JavaScript for activating employee barcode scanner
	$('#activate_employee_scanner').click(function(){
		loadScanner('_employee');
	});

	// Employee lookup, a modal with searched employee will popup
	// $('#search-employee').click(function(){
	// 	employeeModal();
	// });

	// Model buttons
	// $('.cancel_employee, .invalid_employee_search').click(function(){
	// 	employeeSearchReset();
	// })

	// $('#confirm_employee').click(function(){
	// 	$('#confirm_employee, .cancel_employee, .invalid_search').show();
	// 	$('#issuance_incoming_employee_barcode').attr('readonly', true);
	// 	$('#input_employee').addClass('has-success');
	// 	$('#search-employee, #activate_employee_scanner').attr('disabled', true);
	// })
}
$(document).ready(ready);
$(document).on('page:load', ready);

function loadScanner(type){
	$("#webcam"+type).scriptcam({
		path: '/assets/',
		width: 570,
		height: 380,
		onError:onError,
		cornerRadius:0,
		onWebcamReady:onWebcamReady,
		// readBarCodes:'CODE_128,QR_CODE,CODE_39'
	});

	var startScanning = setInterval(function(){
		var decodeValue = $.scriptcam.getBarCode();
		if(!!decodeValue) {
			clearInterval(startScanning);
			$('#issuance_incoming' + type + '_barcode').val(decodeValue)
			$('#ScanModal' + type).modal('hide');
			if(type==='_employee') {
				alert(type);
				employeeModal();
			} else if (type==='_tool') {
				
			};
		}
	}
		, 500);

	$('.cancel_scanner').click(function(){
		clearInterval(startScanning);
	});
}



function employeeModal(){
	var searchValue = $('#issuance_incoming_employee_barcode').val()
	$.getJSON('/employees?search=' + searchValue)
	.done(function(data){
		if (data.length == 0) {
			$('#employee_barcode, #employee_first_name, #employee_last_name, #employee_updated_at').text("Record not found");
			$('#employee_pic').attr('src', "/assets/unavailable.png");
			$('#confirm_employee, .cancel_employee').hide();
		} else {
			$('#issuance_incoming_employee_barcode').val(data[0].barcode);
			$('#employee_barcode').text(data[0].barcode);
			$('#employee_pic').attr('src', data[0].avatar_url);
			$('#employee_first_name').text(data[0].first_name);
			$('#employee_last_name').text(data[0].last_name);
			$('#employee_updated_at').text(data[0].updated_at);	
			$('.invalid_employee_search').hide();
		};
	$('#employeeSearchModal').modal('show');	
	})
}

function employeeSearchReset(){
	$('#issuance_incoming_employee_barcode').val("");
	$('#employee_barcode, #employee_first_name, #employee_last_name, employee_updated_at').text("")
	$('#employee_pic').attr('src', "");
	setTimeout(function(){
		$('#confirm_employee, .cancel_employee, .invalid_employee_search').show()
	}, 500);
	$('#confirm_employee').attr('disabled', true);
}

