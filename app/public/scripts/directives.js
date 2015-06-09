var app = angular.module('app-directives',  []);

app.directive("players", function() {
	return {
		restrict: "E",
		templateUrl: "../views/players.html"
	}
});

app.directive("stats", function() {
	return {
		restrict: "E",
		templateUrl: "../views/stats.html"
	}
});

app.directive("playersnav", function() {
	return {
		restrict: "E",
		templateUrl: "../views/playersnav.html"
	}
});

app.directive("playerheader", function() {
	return {
		restrict: "E",
		templateUrl: "../views/playerheader.html"
	}
});

app.directive("playerinfo", function() {
	return {
		restrict: "E",
		templateUrl: "../views/playerinfo.html"
	}
});

app.directive("bestplayers", function() {
	return {
		restrict: "E",
		templateUrl: "../views/bestplayers.html"
	}
});

app.directive("searchplayers", function() {
	return {
		restrict: "E",
		templateUrl: "../views/search.html"
	}
});

