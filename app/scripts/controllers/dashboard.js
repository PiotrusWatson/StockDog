'use strict';

/**
 * @ngdoc function
 * @name stockDogApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the stockDogApp
 */
angular.module('stockDogApp')
  .controller('DashboardCtrl', function ($scope, WatchlistService, QuoteService) {
  	// [1] LETS GET SOME VARIABLES UP IN THIS
   	var unregisterHandlers = [];
   	$scope.watchlists = WatchlistService.query(); //get all watchlists
   	//formatting stuff :)
   	$scope.cssStyle = 'height:300px';
   	var formatters = {
   		number: [
   			{
   				columnNum: 1,
   				prefix: '$'
   			}
   		]
   	};

   	// [2] HELPER FUNCTION
  });
