var ready;
ready = function() {  
	$('#tool-table').DataTable()

}

$(document).ready(ready);
$(document).on('page:load', ready);