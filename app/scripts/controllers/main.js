'use strict';

/**
 * @ngdoc function
 * @name stockDogApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the stockDogApp
 */
angular.module('stockDogApp')
  .controller('MainCtrl', function ($scope, $location, WatchlistService) {
  	// [1] LETS GET SOME WATCHLISTS UP IN THIS
  	$scope.watchlists = WatchlistService.query();

  	// [2] WATCH PATH FOR CHANGES, IF SO IT CHANGES THE VIEW BASED ON THIS PATH
  	$scope.$watch(function (){
  		return $location.path();
  	}, function(path){
  		if (_.includes(path, 'watchlist')){
  			$scope.activeView = 'watchlist';
  		} else {
  			$scope.activeView = 'dashboard';
  		}
  	});
  });
