// var ready;
// ready = (function() {  
// 	var app = angular.module('toolHero',[]);
	
// 	app.controller('empCtrl', ['$http', '$scope', function($http, $scope){

// 		$scope.searchEmp = function(text) {
// 			$http.get('/employees.json?search=' + text).success(function(data){
// 				$scope.employees = data;
// 			});	
// 		};

// 		$scope.loadEmpScanner = function() {
// 			$("#webcam_employee").scriptcam({
// 				path: '/assets/',
// 				width: 570,
// 				height: 380,
// 				onError:onError,
// 				cornerRadius:0,
// 				onWebcamReady:onWebcamReady,
// 				// readBarCodes:'CODE_128,QR_CODE,CODE_39'
// 			});

// 			var startScanning = setInterval(function(){
// 				var decodeValue = $.scriptcam.getBarCode();
// 				if(!!decodeValue) {
// 					clearInterval(startScanning);
// 					$('#ScanModal_employee').modal('hide');
// 					$http.get('/employees.json?search=' + decodeValue).success(function(data){
// 						if (data.length === 1) {
// 							$('#issuance_incoming_employee_barcode').val(decodeValue)
// 							$scope.setUser(data[0]);
// 						} else {
// 							$('#errorModal').modal('show');	
// 						};
// 					});
// 				};
// 			}, 400);

// 			$('.cancel_scanner').click(function(){
// 				clearInterval(startScanning);
// 			});
// 		};

// 		$scope.setUser = function(json) {
// 			$scope.userName = json.first_name + " " + json.last_name;
// 			$scope.userAvatar = json.avatar_url_thumb
// 			$('.confirm_employee').attr('disabled', false);
// 		}

// 		$scope.resetUser = function() {
// 			$scope.userName = null;
// 			$scope.userAvatar = null;
// 			$('.confirm_employee').attr('disabled', true);
// 		}

// 		$scope.confirmUser = function() {
// 			$('#issuance_incoming_employee_barcode').attr('readonly', true);
// 			$('#input_employee').addClass('has-success');
// 			$('#search-employee, #activate_employee_scanner').attr('disabled', true);
// 		};
		
// 	}]);


// })()
// $(document).ready(ready);
// $(document).on('page:load', ready);

