'use strict';

/**
 * @ngdoc directive
 * @name stockDogApp.directive:stkWatchlistPanel
 * @description
 * # stkWatchlistPanel
 */
angular.module('stockDogApp')
// [1] LETS SET UP DIRECTIVE WITH THIS NAME, ALSO LET IT KNOW WHAT SERVICES IT DEPENDS ON
//SO ITS KINDA LIKE IMPORTING WATCHLISTSERVICE
  .directive('stkWatchlistPanel', function ($location, $modal, WatchlistService) {
    return {
      templateUrl: 'views/templates/watchlist-panel.html',
      restrict: 'E', //THIS MEANS ITS HANDLED ONLY AS A HTML ELEMENT
      scope: {},
      link: function ($scope) {
      	// [2] :ETS GET SOME VARIABLES ALL UP IN THIS
        $scope.watchlist = {};
        var addListModal = $modal({ //makes a new modal window object thats like inside the other window
        	scope: $scope,
        	template: 'views/templates/addlist-modal.html',
        	show: false
        });

        //[3] AIGHT SON WE GETTING OUR WATCHLISTS, BUT ONLY WITHIN THE GIVEN SCOPE
        $scope.watchlists = WatchlistService.query();

        //[4] SHOWS THE MODAL WINDOW WHEN CALLED

        $scope.showModal = function() {
        	addListModal.$promise.then(addListModal.show);
        };

        // [5] CREATES A NEW LIST WHICH IS THEN SAVED TO THE WATCHLISTS
        $scope.createList = function(){
        	WatchlistService.save($scope.watchlist);
        	addListModal.hide();
        	$scope.watchlist = {};
        };

        //[6] DELETES A SPECIFIED LIST FROM WATCHLIST, THEN P MUCH REFRESHES :)
        $scope.deleteList = function(list){
        	WatchlistService.remove(list);
        	$location.path('/');
        };
      }
    };
  });
