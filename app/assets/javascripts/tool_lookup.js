// tool lookup, a modal with searched tool will popup
var ready;
ready = function() {  
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
		$('#confirm_tool').show();
		$('.cancel_tool').show();
		$('.invalid_search').show();
	})
}
$(document).ready(ready);
$(document).on('page:load', ready);


function toolModal(){
	var searchValue = $('#issuance_incoming_tool_barcode').val()

	$.getJSON('/tools?search=' + searchValue)
		.done(function(data){
			if (data.length !== 1) {
				$('#tool_barcode').text("Record not found");
				$('#tool_pic').attr('src', "/assets/unavailable.png");
				$('#tool_discription').text("Record not found");
				$('#tool_quantity').text("Record not found");
				$('#tool_notes').text("Record not found");
				$('#tool_updated_at').text("Record not found");	
				$('#confirm_tool').hide();
				$('.cancel_tool').hide();
			} else {
				$('#issuance_incoming_tool_barcode').val(data[0].barcode);
				$('#tool_barcode').text(data[0].barcode);
				$('#tool_pic').attr('src', data[0].avatar_url);
				$('#tool_discription').text(data[0].discription);
				$('#tool_quantity').text(data[0].quantity_on_hand + "/" + data[0].quantity);
				$('#tool_notes').text(data[0]).notes);
				$('#tool_updated_at').text(data[0].updated_at);	
				$('.invalid_search').hide();

			};
	})
}

function toolSearchReset(){
	$('#issuance_incoming_tool_barcode').val("");
	$('#tool_barcode').text("")
	$('#tool_pic').attr('src', "");
	$('#tool_first_name').text("");
	$('#tool_last_name').text("");
	$('#tool_updated_at').text("");
	$('#confirm_tool').show();
	$('.cancel_tool').show();
	$('.invalid_search').show();
}