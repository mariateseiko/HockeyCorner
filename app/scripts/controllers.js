
var app = angular.module('app-controllers', []);
app.controller('sortCtrl', ['$scope', '$filter', function($scope, $filter) {
	var orderBy = $filter('orderBy');
	$scope.reverseAge = false;
	$scope.reverseName = false;
	$scope.reverseWeight = false;
	$scope.reverseHeight = false;
	$scope.order = function( predicate, reverse) {
	
		$scope.$parent.position = orderBy($scope.$parent.position, predicate, reverse);
		
	}

}]);

