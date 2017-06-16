'use strict';

/**
 * @ngdoc function
 * @name stockDogApp.controller:WatchlistCtrl
 * @description
 * # WatchlistCtrl
 * Controller of the stockDogApp
 */
angular.module('stockDogApp')
  .controller('WatchlistCtrl', function ($scope, $routeParams, $modal, 
  								WatchlistService, CompanyService) {
  		//[1] LETS GET SOME VARIABLES INITIALIZED
  		$scope.companies = CompanyService.query(); //query is std resource method
  		$scope.wlist= WatchlistService.query($routeParams.listId); //get watchlist URL is pointing to
  		$scope.stocks = $scope.wlist.stocks;
  		$scope.newStock = {};
  		var addStockModal = $modal({
  			scope: $scope,
  			template: 'views/templates/addstock-modal.html',
  			show: false
  		});

  		//[2] Shows the addStockModal when called (by anything)
  		$scope.showStockModal = function(){
  			addStockModal.$promise.then(addStockModal.show);
  		};

  		//[3] add stocks (from watchlist) and hide modal when called
  		$scope.addStock = function(){
  			$scope.wlist.addStock({
  				//assigning stuff that'll be filled from the form to the addStock obj
  				listId: $routeParams.listId,
  				company: $scope.newStock.company,
  				shares: $scope.newStock.shares
  			});
  			addStockModal.hide();
  			$scope.newStock = {}; //reset newStock now it has served its purpose
  		};
  });
