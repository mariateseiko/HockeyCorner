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

app.directive("playersnav", function() {
	return {
		restrict: "E",
		templateUrl: "./playersnav.html"
	}
});

app.directive("playerheader", function() {
	return {
		restrict: "E",
		templateUrl: "./playerheader.html"
	}
});

app.directive("playerinfo", function() {
	return {
		restrict: "E",
		templateUrl: "./playerinfo.html"
	}
});

app.directive("bestplayers", function() {
	return {
		restrict: "E",
		templateUrl: "./bestplayers.html"
	}
});