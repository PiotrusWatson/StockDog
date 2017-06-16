'use strict';

/**
 * @ngdoc directive
 * @name stockDogApp.directive:stkSignFade
 * @description IT KINDA MAKES AN ELEMENT FADE OUT ON VALUE CHANGE. THATS IT
 * # stkSignFade
 */
angular.module('stockDogApp')
  .directive('stkSignFade', function ($animate) {
    return {
      restrict: 'A',
      link: function ($scope, $element, $attrs) {
        var oldVal = null;
        // [1] CHECK IF VALUES HAVE CHANGED USING OBSERVE
        $attrs.$observe('stkSignFade', function(newVal){
        	if (oldVal && oldVal === newVal) { return; } //no change so lets stop ok

        	var oldPrice = parseFloat(oldVal);
        	var newPrice = parseFloat(newVal);
        	oldVal = newVal;
        	// [2] FADE IN ADD THE CORRECT ANIM CLASS, AND THEN FADE OUT KILL IT 

        	if (oldPrice && newPrice){
        		var direction = newPrice - oldPrice >= 0 ? 'up' : 'down';
        		$animate.addClass($element, 'change-' + direction).then(function(){
        			$animate.removeClass($element, 'change-' + direction);
        		});
        	}
        });
      }
    };
  });
