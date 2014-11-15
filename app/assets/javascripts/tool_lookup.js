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
		setTimeout(function(){
			$('#confirm_tool').show();
			$('.cancel_tool').show();
			$('.invalid_search').show();
		}, 500);
	})

function toolModal(){
	var searchValue = $('#' + $('#tool_barcode').attr('for')).val()
	$.getJSON('/tools?search=' + searchValue)
		.done(function(data){
			if (data.length !== 1) {
				$('#tool_barcode_field').text("Record not found");
				$('#tool_pic').attr('src', "/assets/unavailable.png");
				$('#tool_discription').text("Record not found");
				$('#tool_quantity').text("Record not found");
				$('#tool_notes').text("Record not found");
				$('#tool_updated_at').text("Record not found");	
				$('#confirm_tool').hide();
				$('.cancel_tool').hide();
			} else {
				$('#issuance_incoming_tool_barcode').val(data[0].barcode);
				$('#tool_barcode_field').text(data[0].barcode);
				$('#tool_pic').attr('src', data[0].image_url);
				$('#tool_description').text(data[0].description);
				$('#tool_quantity').text(data[0].quantity_on_hand + "/" + data[0].quantity);
				$('#tool_notes').text(data[0].notes);
				$('#tool_updated_at').text(data[0].updated_at);	
				$('.invalid_search').hide();

			};
	})
}

function toolSearchReset(){
	$('#' + $('#tool_barcode').attr('for')).val("");
	$('#tool_barcode_field').text("")
	$('#tool_pic').attr('src', "");
	$('#tool_description').text("");
	$('#tool_quantity').text("");
	$('#tool_notes').text("");
	$('#tool_updated_at').text("");
	setTimeout(function(){
		$('#confirm_tool').show();
		$('.cancel_tool').show();
		$('.invalid_search').show();
		
	}, 500);
}

}
$(document).ready(ready);
$(document).on('page:load', ready);