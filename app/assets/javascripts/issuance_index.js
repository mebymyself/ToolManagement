var ready;
ready = function() {  

	// JavaScript for dataTable applied to issuance_index
	var iTable = $('#issuance-table').DataTable ({
		"responsive": true,
		"columnDefs": [
			{
				"targets": [5],
				"orderable": false
			}, 
			{
				"targets": [4],
				"visible": false,
				"orderable": false
			}
		]
	});

	$("#outstanding-only").click(function() {
		if ($("#outstanding-only").is(":checked")) {
			iTable
				.columns(4)
				.search(true)
				.draw()
		} else {
			iTable
				.columns(4)
				.search("")
				.draw()
		};	
	});
}

$(document).ready(ready);
$(document).on('page:load', ready);