'use strict';

/**
 * @ngdoc directive
 * @name stockDogApp.directive:stkStockTable
 * @description
 * # stkStockTable
 */
angular.module('stockDogApp')
  .directive('stkStockTable', function () {
    return {
      templateUrl: 'views/templates/stock-table.html',
      restrict: 'E',
      // [1] RESTRICT IT TO ENTIRELY WATCHLIST SCOPE - HAVE TO TELL IT ABOUT WATCHLISTS ALL DAY
      scope: {
      	watchlist: '='
      },
      // [2] MAKE A CONTROLLER WHICH IS HOW WE LET OTHER DIRECTIVES TALK TO US
      controller: function($scope){
      	var rows = [];

      	$scope.$watch('showPercent', function(showPercent){
      		if(showPercent){
      			_.each(rows, function(row){
      				row.showPercent = showPercent;
      			});
      		}
      	});

      	this.addRow = function(row){
      		rows.push(row);
      	};

      	this.removeRow = function(row){
      		_.remove(rows, row);
      	};

      },

      //[3] ITS A LINK FUNCTION - USE FOR EVERYTHING ELSE ALL OTHER LOGIC LOL
      link: function($scope) {
        $scope.showPercent = false;
        $scope.removeStock = function(stock){
        	$scope.watchlist.removeStock(stock);
        };
      }
    };
  });
