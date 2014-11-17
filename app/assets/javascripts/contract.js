var ready;
ready = function() {  

	$('.proceed').click(function(){
		$('#issuanceContractModal').modal('show');
		$(document).signaturePad({drawOnly:true});
	});
}
$(document).ready(ready);
$(document).on('page:load', ready);	