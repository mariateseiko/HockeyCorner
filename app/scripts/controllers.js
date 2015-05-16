
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

app.controller('searchCtrl', ['$filter', function ($filter) {
	$scope.find = function(findText) {
		var filterdData = $filter('filter')($scope.$parent.allTeams, text);
		$scope.search = filterData;
	};

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
		$scope.positions = $scope.allTeams[$scope.teams[index].abbr];
		$scope.position = $scope.positions[0];
		$scope.havePlayers = true; 
		$scope.teamIndex = index;
		$scope.teamName = $scope.teams[index].name;
		$scope.logoUrl = 'http://1.cdn.nhle.com/'+$scope.getShortName($scope.teamName)+'/images/logos/large.png';
		$scope.$broadcast ('loadTeam');
	};

	$scope.getPosition = function() {
		return $scope.position;
	}

	$scope.connectStatsToPlayers = function(positions, skaters, goalies) {
		var goalieKeys = ["num", "pos", "name", "GP", "W", "L", "OT", "GA", "SA", "SV", "SVpc", "GAA", "SO", "PIM", "MIN"];
		var skatersKeys = ["num", "pos", "name", "GP", "G", "A", "P", "PM", "PIM", "S", "TOI", "PP", "SH", "GWG", "OT"];

		for (var i = 0; i < positions[0].length; i++) {
			
			var found = false;
			for (var j = 0; j < goalies.length; j++) {
				if (positions[0][i].id == goalies[j].id) {
					var data = goalies[j].data;
					var stats = data.split(",");		
					for (var k = 3; k < goalieKeys.length; k++)
						positions[0][i][goalieKeys[k]] = stats[k];
					found = true;
					break;
				}
			}
			
			if (!found)
				for (var k = 3; k < skatersKeys.length; k++)
						positions[0][i][goalieKeys[k]] = 0;
		}

		for (var l = 1; l <= 2; l++)
			
			for (var i = 0; i < positions[l].length; i++) {
				found = false;
				for (var j = 0; j < skaters.length; j++)
					if (positions[l][i].id == skaters[j].id) {
						var data = skaters[j].data;
						var stats = data.split(",");
						for (var k = 3; k < skatersKeys.length; k++)
							positions[l][i][skatersKeys[k]] = stats[k];
						found = true;
					    break;
					}
					if(!found)
				for (var k = 3; k < skatersKeys.length; k++)
							positions[l][i][skatersKeys[k]] = 0;
			}
			
		
	}

	$scope.getStats = function(teamAbbr, positions) {
		$http.get('https://cors-anywhere.herokuapp.com/http://nhlwc.cdnak.neulion.com/fs1/nhl/league/playerstatsline/20142015/2/'+teamAbbr+'/iphone/playerstatsline.json')
  		.success(function (response) {
  			$scope.playersStats = response.skaterData;
  			$scope.goalieStats = response.goalieData;
  			$scope.connectStatsToPlayers(positions, $scope.playersStats, $scope.goalieStats, teamAbbr);
  		});
	}

	$scope.setZero = function(positions) {
		var goalieKeys = ["num", "pos", "name", "GP", "W", "L", "OT", "GA", "SA", "SV", "SVpc", "GAA", "SO", "PIM", "MIN"];
		var skatersKeys = ["num", "pos", "name", "GP", "G", "A", "P", "PM", "PIM", "S", "TOI", "PP", "SH", "GWG", "OT"];
		for (var i = 0; i < positions[0].length; i++)
			for (var j = 3; j < goalieKeys.length; j++)
				positions[0][i][goalieKeys[j]] = 0;
						
		for (var l = 1; l <= 2; l++)
			for (var i = 0; i < positions[l].length; i++)
				for (var k = 3; k < skatersKeys.length; k++)
					positions[l][i][skatersKeys[k]] = 0;
	}

	$scope.getAll = function() {
		$scope.allTeams = [];
		angular.forEach($scope.teams, function(team){
				$http.get('https://cors-anywhere.herokuapp.com/http://nhlwc.cdnak.neulion.com/fs1/nhl/league/teamroster/'+team.abbr+'/iphone/clubroster.json')
  			.success(function (response) {
	  			var games = response; 
	  			$scope.positions = [games.goalie, games.forwards, games.defensemen]; 
	  			$scope.allTeams[team.abbr] = $scope.positions;
  			});
		});
		angular.forEach($scope.teams, function(team){
				$http.get('https://cors-anywhere.herokuapp.com/http://nhlwc.cdnak.neulion.com/fs1/nhl/league/playerstatsline/20142015/3/'+team.abbr+'/iphone/playerstatsline.json')
  			.success(function (response) {
  				if (response.skaterData.length == 0) 
  					$scope.setZero($scope.allTeams[team.abbr]);
  				else {
	  				$scope.playersStats = response.skaterData;
	  				$scope.goalieStats = response.goalieData;
	  				$scope.connectStatsToPlayers($scope.allTeams[team.abbr], $scope.playersStats, $scope.goalieStats);
	  			}	
  			});
  		});
  		
	};
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
		/*positionsTab = 1;*/
		$scope.setTabPosition(1);
		sortTab = 1;       

    });
	
	
});	

app.controller('pagesCtrl', function($scope, $http) {
	var pageTab = 1;
	$scope.isSetPage = function(checkPage) {
		return pageTab == checkPage;
	};
	$scope.setPage = function(page) {
		pageTab = page;
	};
	$scope.showBest = function() {
		$scope.$broadcast ('showBest');
	}

});

app.controller('bestCtrl', function($scope, $http) {
	var bestTab = 0;
	$scope.isSetBestTab = function(tab) {
		return bestTab === tab;
	};

	

	var categories = ["points", "goals", "assists", "plusminus", "wins", "gaa", "savepercentage", "shutouts"];
	$scope.best = [];

	$scope.getFullName = function(teams, value) {
		for (var i = 0, len = teams.length; i < len; i++) {
    		if (teams[i].abbr == value) return teams[i].name;
  		}
	}

	

	$scope.displayBest = function(index) {
		var category = categories[index];
		$scope.best=[];
		$http.get('https://cors-anywhere.herokuapp.com/http://nhlwc.cdnak.neulion.com/fs1/nhl/league/leagueleaders/iphone/'+category+'/leagueleaders.json')
  		.success(function (response) {
  			for (i = 0; i < response.skaterData.length; i++) {
				var playerid = response.skaterData[i].id;
				//console.log(playerid);
				var teamName = response.skaterData[i].data.split(",")[1].substr(1);  

				players:
				
					for (j = 0; j < 3; j++)
						for (k = 0; k < $scope.$parent.allTeams[teamName][j].length; k++){
							if ($scope.$parent.allTeams[teamName][j][k].id === playerid) {
								$scope.$parent.allTeams[teamName][j][k].logoUrl = 'http://1.cdn.nhle.com/'+$scope.$parent.getShortName($scope.getFullName($scope.$parent.teams, teamName))+'/images/logos/large.png';
								$scope.$parent.allTeams[teamName][j][k].teamName = $scope.getFullName($scope.$parent.teams, teamName);
								$scope.best.push($scope.$parent.allTeams[teamName][j][k]);
								//console.log($scope.best);
								break players ;
							}

							
						}

			}
  			});
  			
  		};	
  		  
$scope.setBestTab = function(tab) {
		bestTab = tab;
		$scope.displayBest(tab);
};
    
$scope.displayNumber = function(player) {
	switch(bestTab) {
		case 0: return player.P;
		case 1: return player.G;
		case 2: return player.A;
		case 3: return player.PM;
		case 4: return player.W;
		case 5: return player.GAA;
		case 6: return player.SVpc;
		case 7: return player.SO;
	}
}

	$scope.$on('showBest', function(e) {  
		bestTab = 0;
		$scope.displayBest(0);   
});
	
});