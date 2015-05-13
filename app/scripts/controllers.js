
var app = angular.module('app-controllers', []);
app.controller('sortCtrl', ['$scope', '$filter', function($scope, $filter) {
	var orderBy = $filter('orderBy');
	$scope.reverseAge = false;
	$scope.reverseName = false;
	$scope.reverseWeight = false;
	$scope.reverseHeight = false;
	$scope.order = function( predicate, reverse, positions) {
		positions[0] = orderBy(positions[0], predicate, reverse);
		positions[1] = orderBy(positions[1], predicate, reverse);
		positions[2] = orderBy(positions[2], predicate, reverse);
		
		
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
  			$scope.logoUrl = 'http://1.cdn.nhle.com/'+$scope.getShortName($scope.teamName)+'/images/logos/large.png';
  			$scope.getStats($scope.teamAbbr);
  			$scope.$broadcast ('loadTeam');
  		});
	};

	$scope.connectStatsToPlayers = function(positions, skaters, goalies) {
		var goalieKeys = ["num", "pos", "name", "GP", "W", "L", "OT", "GA", "SA", "SV", "SVpc", "GAA", "SO", "PIM", "MIN"];
		var skatersKeys = ["num", "pos", "name", "GP", "G", "A", "P", "PM", "PIM", "S", "TOI", "PP", "SH", "GWG", "OT"];
		for (var i = 0; i < positions[0].length; i++)
			for (var j = 0; j < goalies.length; j++)
				if (positions[0][i].id == goalies[j].id) {
					var data = goalies[j].data;
					var stats = data.split(",");
					console.log(stats);
					for (var k = 3; k < goalieKeys.length; k++)
						positions[0][i][goalieKeys[k]] = stats[k];
					break;
				}
		for (var l = 1; l <= 2; l++)
		for (var i = 0; i < positions[l].length; i++)
			for (var j = 0; j < skaters.length; j++)
				if (positions[l][i].id == skaters[j].id) {
					var data = skaters[j].data;
					var stats = data.split(",");
					for (var k = 3; k < skatersKeys.length; k++)
						positions[l][i][skatersKeys[k]] = stats[k];

					break;
				}
	}

	$scope.getStats = function(teamAbbr) {
		$http.get('https://cors-anywhere.herokuapp.com/http://nhlwc.cdnak.neulion.com/fs1/nhl/league/playerstatsline/20142015/2/'+teamAbbr+'/iphone/playerstatsline.json')
  		.success(function (response) {
  			$scope.playersStats = response.skaterData;
  			$scope.goalieStats = response.goalieData;
  			$scope.connectStatsToPlayers($scope.positions, $scope.playersStats, $scope.goalieStats);
  		});
	}	

	
}]);	

app.controller('tabsCtrl', function($scope, $http) {
	var positionsTab = 1;
	var statsTab = 2;
	var sortTab = 1;
	$scope.isSetPosition = function(checkTab) {
		return positionsTab === checkTab;
	};
	$scope.setTabPosition = function(activeTab) {
		positionsTab = activeTab;
		$scope.$parent.position = $scope.$parent.positions[activeTab - 1];
	};
	$scope.isSetStats = function(checkTab) {
		return statsTab === checkTab;
	};
	$scope.setTabStats = function(activeTab) {
		statsTab = activeTab;
		
	};
	$scope.isSetSort = function(checkTab) {
		return sortTab === checkTab;
	};
	$scope.setTabSort = function(activeTab) {
		sortTab = activeTab;
		$scope.$parent.position = $scope.$parent.positions[positionsTab-1];
	};
	$scope.getPosition = function() {
		return $scope.$parent.position;
	};
	$scope.$on('loadTeam', function(e) {  
		positionsTab = 1;
		sortTab = 1;         
    });
	
	
});	

app.controller('pagesCtrl', function($scope, $http) {
	var pageTab = 1;
	$scope.isSetPage = function(checkPage) {
		return pageTab === checkPage;
	};
	$scope.setPage = function(page) {
		pageTab = page;
	}
});