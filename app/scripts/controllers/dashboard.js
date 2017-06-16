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

   	// [2] HELPER FUNCTION THAT MAKES SOME NICE CHARTS :)
   	var updateCharts = function() {
   		//Donut chart
   		var donutChart = {
   			type: 'PieChart',
   			displayed: true,
   			data: [['Watchlist', 'Market Value']],
   			options: {
   				title: 'Market Value by Watchlist',
   				legend: 'none',
   				pieHole: 0.4
   			},
   			formatters: formatters
   		};

   		//Column chart
   		var columnChart = {
   			type: 'ColumnChart',
   			displayed: true,
   			data: [['Watchlist', 'Change', { role: 'style'} ]],
   			options: {
   				title: 'Day Change by Watchlist',
   				legend: 'none',
   				animation: {
   					duration: 1500,
   					easing: 'linear'
   				}
   			},
   			formatters: formatters
   		};

   		// [3] FOR EACH WATCHLIST, PUSH DATA INTO THESE HERE CHARTS (SPECIFICALLY THEIR DATA ATTRIBS)
   		_.each($scope.watchlists, function(watchlist){
   			donutChart.data.push([watchlist.name, watchlist.marketValue]);
   			columnChart.data.push([watchlist.name, watchlist.dayChange, 
   				watchlist.dayChange < 0 ? 'Red' : 'Green']);
   		});
   		$scope.donutChart = donutChart;
   		$scope.columnChart = columnChart;
   	};

   	// [4] HELPER THAT RESETS ERRYTHING IN CONTROLLER, FULL STATE RESET
   	var reset = function() {
   		// [5] BEFORE REGISTERING STUFF, CLEAR THE QUOTE
   		QuoteService.clear();
   		_.each($scope.watchlists, function(watchlist) {
   			_.each(watchlist.stocks, function(stock){
   				QuoteService.register(stock);
   			});
   		});

   		// [6] BEFORE MAKING NEW LISTENERS, UNREGISTER ALL THE OLD ONES
   		_.each(unregisterHandlers, function(unregister){
   			unregister();
   		});
   		_.each($scope.watchlists, function(watchlist){
   			var unregister = $scope.$watch(function() {
   				return watchlist.marketValue;
   			}, function(){
   				recalculate();
   			});
   			unregisterHandlers.push(unregister);
   		});
   	};

   	//[7] CALCULATE TOTAL MARKETVALUE + DAYCHANGE OVER ALL WATCHLISTS
   	var recalculate = function() {
   		$scope.marketValue = 0;
   		$scope.dayChange = 0;
   		_.each($scope.watchlists, function(watchlist){
   			//if marketvalue, use that else 0
   			$scope.marketValue += watchlist.marketValue ?
   				watchlist.marketValue : 0;
   			$scope.dayChange += watchlist.dayChange ?
   				watchlist.dayChange : 0;
   		});
   		updateCharts();
   	};
   	//[8] IF WATCHLISTS CHANGE, LETS RESET
   	$scope.$watch('watchlists.length', function(){
   		reset();
   	});
  });
