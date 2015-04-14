
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

app.controller('playersCtrl', ['$scope','$http', function($scope, $http) {
	$scope.teams = [{
		"name": "Anaheim Ducks",
		"abbr": "ANA",
	},	{
		"name": "Arizona Coyotes",
		"abbr": "ARI"
	}, {
		"name": "Boston Bruins",
		"abbr": "BOS"
	},	{
		"name": "Buffalo Sabres",
		"abbr": "BUF"
	},	{
		"name": "Calgary Flames",
		"abbr": "CGY"
	},	{
		"name": "Carolina Hurricanes",
		"abbr": "CAR"
	},	{
		"name": "Chicago Blackhawks",
		"abbr": "CHI"
	},	{
		"name": "Colorado Avalanche",
		"abbr": "COL"
	},	{
		"name": "Colombus Blue Jackets",
		"abbr": "CBJ"
	},	{
		"name": "Dallas Stars",
		"abbr": "DAL"
	},	{
		"name": "Detroit Red Wings",
		"abbr": "DET"
	},	{
		"name": "Edmonton Oilers",
		"abbr": "EDM"
	},	{
		"name": "Florida Panthers",
		"abbr": "FLA"
	},	{
		"name": "Los Angeles Kings",
		"abbr": "LAK"
	},	{
		"name": "Minnesota Wild",
		"abbr": "MIN"
	},	{
		"name": "Montreal Canadiens",
		"abbr": "MTL"
	},	{
		"name": "Nashville Predators",
		"abbr": "NSH"
	}, {
		"name": "New Jersey Devils",
		"abbr": "NJD"
	}, {
		"name": "New York Islanders",
		"abbr": "NYI"
	}, {
		"name": "New York Rangers",
		"abbr": "NYR"
	}, {
		"name": "Ottawa Senators",
		"abbr": "OTT"
	}, {
		"name": "Philadelphia Flyers",
		"abbr": "PHI"
	}, {
		"name": "Pittsburgh Penguins",
		"abbr": "PIT"
	}, {
		"name": "San Jose Sharks",
		"abbr": "SJS"
	}, {
		"name": "St.Louis Blues",
		"abbr": "STL"
	}, {
		"name": "Tampa Bay Lightning",
		"abbr": "TBL"
	}, {
		"name": "Toronto Maple Leafs",
		"abbr": "TOR"
	}, {
		"name": "Vancouver Canucks",
		"abbr": "VAN"
	}, {
		"name": "Washington Capitals",
		"abbr": "WSH"
	}, {
		"name": "Winnipeg Jets",
		"abbr": "WPG"
	}];
	$scope.havePlayers = false;
	$scope.getShortName = function(teamName) {
		lastWord = teamName.split(" ").pop().toLowerCase();
		switch(lastWord) {
			case "jackets": 
				return "bluejackets";
			case "wings":
				return "redwings";
			case "leafs":
				return "mapleleafs";
			default:
				return lastWord;
		}
	};

	$scope.displayTeam = function(index) {
		$scope.teamAbbr = $scope.teams[index].abbr;
		$http.get('https://cors-anywhere.herokuapp.com/http://nhlwc.cdnak.neulion.com/fs1/nhl/league/teamroster/'+$scope.teamAbbr+'/iphone/clubroster.json')
  		.success(function (response) {
  			$scope.teamName = $scope.teams[index].name;;
  			var games = response; 
  			$scope.positions = [games.goalie, games.forwards, games.defensemen]; 
  			$scope.position = $scope.positions[0];
  			$scope.havePlayers = true; 
  			$scope.teamIndex = index;
  			console.log($scope.havePlayers);
  			$scope.logoUrl = 'http://1.cdn.nhle.com/'+$scope.getShortName($scope.teamName)+'/images/logos/large.png';
  		});
	};


}]);	

app.controller('tabsCtrl', function($scope, $http) {
	var positionsTab = 1;
	var statsTab = 1;
	var sortTab = 1;
	$scope.isSetPosition = function(checkTab) {
		return positionsTab === checkTab;
	};
	$scope.setTabPosition = function(activeTab) {
		positionsTab = activeTab;
		$scope.$parent.position = $scope.$parent.positions[activeTab - 1];
	};
	$scope.isSetStats = function(checkTab) {
		return positionsTab === checkTab;
	};
	$scope.setTabStats = function(activeTab) {
		statsTab = activeTab;
		$scope.$parent.position = $scope.$parent.positions[activeTab - 1];
	};
	$scope.isSetSort = function(checkTab) {
		return sortTab === checkTab;
	};
	$scope.setTabSort = function(activeTab) {
		sortTab = activeTab;
		$scope.$parent.position = $scope.$parent.positions[activeTab - 1];
	};
	$scope.getPosition = function() {
		return $scope.$parent.position;
	};
		
		
});	