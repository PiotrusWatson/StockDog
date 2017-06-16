'use strict';

/**
 * @ngdoc directive
 * @name stockDogApp.directive:stkStockRow
 * @description
 * # stkStockRow
 */
angular.module('stockDogApp')
  .directive('stkStockRow', function ($timeout, QuoteService) {
    return {
    //[1] TREATED AS AN ELEMENT ATTRIBUTE, ALSO REQUIRES stkStockTable controller 
      restrict: 'A',
      require: '^stkStockTable',
      scope: {
      	stock: '=',
      	isLast: '='
      },
      //[2] LOOK AT THAT LAST PARAM. IT'S A CONTROLLER. THIS IS HOW WE PASS OUR CONTROLLERS
      link: function ($scope, $element, $attrs, stockTableCtrl) {
        //[3] LETS GET A TOOLTIP FOR THIS stock-row
        $element.tooltip({
        	placement: 'left',
        	title: $scope.stock.company.name
        });

        //[4] HEY FROM HERE WE CAN ADD THIS ROW WE EXIST IN TO THE TABLE
        stockTableCtrl.addRow($scope);

        //[5] AND REGISTER IT WITH THE QUOTESERVICE
        QuoteService.register($scope.stock);

        //[6] IF WE CALL DESTROY, WE CAN THEN DEREGISTER IT
        $scope.$on('$destroy', function(){
        	stockTableCtrl.removeRow($scope);
        	QuoteService.deregister($scope.stock);
        });

        //[7] IF LAST STOCK ROW, GET SOME QUOTES UP IN THIS
        if ($scope.isLast) {
        	$timeout(QuoteService.fetch);
        }

        //[8] IF SHARES CHANGE, LET'S DO SOME RECALCULATION 
        $scope.$watch('stock.shares', function(){
        	$scope.stock.marketValue = $scope.stock.shares *
        		$scope.stock.lastPrice;
        	$scope.stock.dayChange = $scope.stock.shares *
        		parseFloat($scope.stock.change);
        	$scope.stock.save();
        });
      }
    };
  });
