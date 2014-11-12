var ready;
ready = function() {  
	$('#employee-table').dataTable({
		"columnDefs": [{
			"targets": [4, 5],
			"orderable": false
		}]
	});
}
$(document).ready(ready);
$(document).on('page:load', ready);

// Employee lookup, a modal with searched employee will popup
var ready;
ready = function() {  
	$('#search-employee').click(function(){
		event.preventDefault();
		employeeModal();
	});

	$('.cancel_employee').click(function(){
		employeeSearchReset();
	})

	$('.invalid_search').click(function(){
		employeeSearchReset();
	})

	$('#confirm_employee').click(function(){
		$('#confirm_employee').show();
		$('.cancel_employee').show();
		$('.invalid_search').show();
	})
}
$(document).ready(ready);
$(document).on('page:load', ready);


function employeeModal(){
	var searchValue = $('#issuance_incoming_employee_barcode').val()

	$.getJSON('/employees?search=' + searchValue)
		.done(function(data){
			if (data.length !== 1) {
				$('#employee_barcode').text("Record not found");
				$('#employee_pic').attr('src', "/assets/unavailable.png");
				$('#employee_first_name').text("Record not found");
				$('#employee_last_name').text("Record not found");
				$('#employee_updated_at').text("Record not found");	
				$('#confirm_employee').hide();
				$('.cancel_employee').hide();
			} else {
				$('#issuance_incoming_employee_barcode').val(data[0].barcode);
				$('#employee_barcode').text(data[0].barcode);
				$('#employee_pic').attr('src', data[0].avatar_url);
				$('#employee_first_name').text(data[0].first_name);
				$('#employee_last_name').text(data[0].last_name);
				$('#employee_updated_at').text(data[0].updated_at);	
				$('.invalid_search').hide();

			};
	})
}

function employeeSearchReset(){
	$('#issuance_incoming_employee_barcode').val("");
	$('#employee_barcode').text("")
	$('#employee_pic').attr('src', "");
	$('#employee_first_name').text("");
	$('#employee_last_name').text("");
	$('#employee_updated_at').text("");
	$('#confirm_employee').show();
	$('.cancel_employee').show();
	$('.invalid_search').show();
}

// Need clear modal function
// Need clear text field function