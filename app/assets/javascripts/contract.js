var ready;
ready = function() {  

	$('.proceed').click(function(){
		$('#issuanceContractModal').modal('show');
	});

	// Inserting signature-pad
	$(this).signaturePad({drawOnly:true});

}
$(document).ready(ready);
$(document).on('page:load', ready);	