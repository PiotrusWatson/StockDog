'use strict';

var NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/;
/**
 * @ngdoc directive
 * @name stockDogApp.directive:contenteditable
 * @description
 * # contenteditable
 */
angular.module('stockDogApp')
  .directive('contenteditable', function ($sce) {
    return {
      restrict: 'A',
      require: 'ngModel', // [1] HERE WE GET THE NGMODEL CONTROLLER THAT ANGULAR LIKES
      link: function ($scope, $element, $attrs, ngModelCtrl) {
        if(!ngModelCtrl){ return; } //if no ngmodel, what is even the point

        //[2] TELL IT HOW TO UPDATE THE UI 
        ngModelCtrl.$render = function() {
        	$element.html($sce.getTrustedHtml(ngModelCtrl.$viewValue || ''));
        };

        // [3] either set the value or like don't lol idc
        var read = function(){
        	var value = $element.html();
        	if ($attrs.type === 'number' && !NUMBER_REGEXP.test(value)) {
        		ngModelCtrl.$render();
        	} else {
        		ngModelCtrl.$setViewValue(value);
        	}
        };

        // [4] SET MODELCTRL TO PARSE NUMBERS AS FLOATS (~~CUSTOM PARSER~~)
        if ($attrs.type === 'number'){
        	ngModelCtrl.$parsers.push(function (value) {
        		return parseFloat(value);
        	});
        }

        // [5] CHECK FOR 3 CHANGE EVENTS TO ENABLE THIS ON ANY OF THEM
        $element.on('blur keyup change', function(){
        	$scope.$apply(read);
        });
      }
    };
  });
