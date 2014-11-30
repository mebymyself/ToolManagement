

	// Model buttons
	// $('.cancel_employee, .invalid_employee_search').click(function(){
	// 	employeeSearchReset();
	// })

	$('.confirm_employee').click(function(){
		$('.confirm_employee, .cancel_employee, .invalid_search').show();
		$('#issuance_incoming_employee_barcode').attr('readonly', true);
		$('#input_employee').addClass('has-success');
		$('#search-employee, #activate_employee_scanner').attr('disabled', true);
	})



// function employeeSearchReset(){
// 	$('#issuance_incoming_employee_barcode').val("");
// 	$('#employee_barcode, #employee_first_name, #employee_last_name, employee_updated_at').text("")
// 	$('#employee_pic').attr('src', "");
// 	setTimeout(function(){
// 		$('.confirm_employee, .cancel_employee, .invalid_employee_search').show()
// 	}, 500);
// 	$('.confirm_employee').attr('disabled', true);
// }

