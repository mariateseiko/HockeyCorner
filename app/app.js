(function () {
var app = angular.module('hockeyCornerApp', []);

app.controller('playersCtrl', function($scope, $http) {
	$scope.teams =  ['ANA', 'ARI', 'BOS', 'BUF', 'CAR', 'CBJ', 'CGY', 'CHI', 'COL', 'DAL', 'DET', 'EDM', 'FLA', 'LAK',
   'MIN', 'MTL', 'NJD', 'NYR', 'OTT', 'PHI', 'PIT', 'SJS', 'STL', 'TBL', 'TOR', 'VAN',
   'WPG',  'WSH'];
   		
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
		$scope.$watch('teamToDisplay', function(newvalue) {
    		$http.get('http://crossorigin.me/http://nhlwc.cdnak.neulion.com/fs1/nhl/league/teamroster/'+newvalue+'/iphone/clubroster.json')
  			.success(function (response) {
  				$scope.games = response; 
  				this.positions = [$scope.games.goalie, $scope.games.forwards, $scope.games.defensemen]; 
  				$scope.havePlayers = true; 
  				$scope.position = positions[0];
  			});
		});
});	

var teams = [{
		name: 'Anaheim Ducks';
		abbr: 'ANA';
	},	{
		name: 'Arizona Coyotes';
		abbr: 'ARI';
	}, {
		name: 'Boston Bruins';
		abbr: 'BOS';
	},	{
		name: 'Buffalo Sabres';
		abbr: 'BUF';
	},	{
		name: 'Calgary Flames';
		abbr: 'CGY';
	},	{
		name: 'Carolina Hurricanes';
		abbr: 'CAR';
	},	{
		name: 'Chicago Blackhawks';
		abbr: 'CHI';
	},	{
		name: 'Colorado Avalanche';
		abbr: 'COL';
	},	{
		name: 'Colombus Blue Jackets';
		abbr: 'CBJ';
	},	{
		name: 'Dallas Stars';
		abbr: 'DAL';
	},	{
		name: 'Detroit Red Wings';
		abbr: 'DET';
	},	{
		name: 'Edmonton Oilers';
		abbr: 'EDM';
	},	{
		name: 'Florida Panthers';
		abbr: 'FLA';
	},	{
		name: 'Los Angeles Kings';
		abbr: 'LAK';
	},	{
		name: 'Minnesota Wild';
		abbr: 'MIN';
	},	{
		name: 'Montreal Canadiens';
		abbr: 'MTL';
	},	{
		name: 'Arizona Coyotes';
		abbr: 'ANA';
	}
];
})();