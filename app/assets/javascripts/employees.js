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