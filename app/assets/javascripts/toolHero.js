var ready;
ready = (function() {  
	var app = angular.module('toolHero',[]);
	app.controller('empCtrl', ['$http', '$scope', function($http, $scope){
		// $scope.employees = [];


		$scope.searchEmp = function(text) {
			$http.get('/employees.json?search=' + text).success(function(data){
				$scope.employees = data;
				if ($scope.employees.length > 0) {
					$('.invalid_employee_search').hide();
				} else {
					$('#confirm_employee').hide();
					$('.cancel_employee').hide();
				};	
			});	
		};

		$scope.setUser = function(json) {
			$scope.userName = json.first_name + " " + json.last_name;
			$scope.userAvatar = json.avatar_url_thumb
			$('#confirm_employee').attr('disabled', false);
		}

		$scope.resetUser = function() {
			$scope.userName = null;
			$scope.userAvatar = null;
		}


			




	}]);
})()
$(document).ready(ready);
$(document).on('page:load', ready);

