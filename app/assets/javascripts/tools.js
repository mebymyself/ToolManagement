var ready;
ready = function() {  
	$('#tool-table').dataTable({
		"columnDefs": [{
			"targets": [1,7,8],
			"orderable": false
		}]
	});
}
$(document).ready(ready);
$(document).on('page:load', ready);