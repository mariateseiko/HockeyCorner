var app = angular.module('app-directives',  []);

app.directive("players", function() {
	return {
		restrict: "E",
		templateUrl: "./players.html"
	}
});

app.directive("stats", function() {
	return {
		restrict: "E",
		templateUrl: "./stats.html"
	}
});
