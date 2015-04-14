var app = angular.module('app-directives',  []);

app.directive("players", function() {
	return {
		restrict: "E",
		templateUrl: "./players.html"
	}
});


