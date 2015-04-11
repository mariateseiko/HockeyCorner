(function () {
var app = angular.module('hockeyCornerApp', []);

app.controller('playersCtrl', function($scope, $http) {
	/*$scope.teams =  ['ANA', 'ARI', 'BOS', 'BUF', 'CAR', 'CBJ', 'CGY', 'CHI', 'COL', 'DAL', 'DET', 'EDM', 'FLA', 'LAK',
   'MIN', 'MTL', 'NJD', 'NYR', 'OTT', 'PHI', 'PIT', 'SJS', 'STL', 'TBL', 'TOR', 'VAN',
   'WPG',  'WSH'];*/
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
	}

];
   		var tab = 1;
   		$scope.havePlayers = false;
		$scope.isSet = function(checkTab) {
			return tab === checkTab;
		};
		$scope.setTab = function(activeTab) {
			tab = activeTab;
			$scope.position = positions[activeTab - 1];
		};
		$scope.getPosition = function() {
			return position;
		};
		$scope.displayTeam = function(index) {
			$scope.teamAbbr = $scope.teams[index].abbr;
    		$http.get('http://crossorigin.me/http://nhlwc.cdnak.neulion.com/fs1/nhl/league/teamroster/'+$scope.teamAbbr+'/iphone/clubroster.json')
  			.success(function (response) {
  				
  				 
  				$scope.teamName = $scope.teams[index].name;;
  				$scope.games = response; 
  				this.positions = [$scope.games.goalie, $scope.games.forwards, $scope.games.defensemen]; 
  				$scope.havePlayers = true; 
  				$scope.teamIndex = index;
  				$scope.setTab(1);
  				console.log(index);
  				$scope.logoUrl = 'http://1.cdn.nhle.com/'+$scope.getShortName($scope.teamName)+'/images/logos/large.png';
  			});
		};
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
		}
});	


})();