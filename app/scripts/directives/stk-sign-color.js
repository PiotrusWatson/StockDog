'use strict';

/**
 * @ngdoc directive
 * @name stockDogApp.directive:stkSignColor
 * @description
 * # stkSignColor
 */
angular.module('stockDogApp')
  .directive('stkSignColor', function () {
    return {
      restrict: 'A',
      link: function ($scope, $element, $attrs) {
        // [1] WATCH FOR CHANGES (using observe)
        $attrs.$observe('stkSignColor', function(newVal) {
        	var newSign = parseFloat(newVal);
        	// [2] IF POS, make element GREEN, ELSE RED
        	if (newSign > 0){
        		$element[0].style.color = 'Green';
        	} else {
        		$element[0].style.color = 'Red';
        	}
        });
      }
    };
  });
