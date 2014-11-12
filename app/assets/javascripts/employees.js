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
		var searchValue = $('#employee_search_box').val()

		$.getJSON('/employees?search=' + searchValue)
			.done(function(data){
				for(i=0; i < data.length; i++){
					console.log(data[i].avatar_url);
					$('#employee_barcode').text(data[i].barcode)
					$('#employee_pic').attr('src', data[i].avatar_url);
					$('#employee_first_name').text(data[i].first_name);
					$('#employee_last_name').text(data[i].last_name);
					$('#employee_updated_at').text(data[i].updated_at);
				}
		})
	});

	$('.cancel_employee').click(function(){
		$('#employee_search_box').val("");
	})
}
$(document).ready(ready);
$(document).on('page:load', ready);

// Need clear modal function
// Need clear text field function