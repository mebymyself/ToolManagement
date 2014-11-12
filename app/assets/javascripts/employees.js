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

// Employee lookup
var ready;
ready = function() {  
	$('.employee-search').click(function(){
		event.preventDefault();
		var searchValue = $('#employee_search').val()

		$.get('/employees?search=' + searchValue)
			.done(function(data){
			console.log(data);
			$('.employee-search-result').html(data);
		})
	});
}
$(document).ready(ready);
$(document).on('page:load', ready);