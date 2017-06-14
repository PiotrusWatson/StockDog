'use strict';

/**
 * @ngdoc service
 * @name stockDogApp.WatchlistService
 * @description
 * # WatchlistService
 * Service in the stockDogApp.
 */
angular.module('stockDogApp')
  .service('WatchlistService', function WatchlistService() {
    // [1] GET SOME WATCHLISTS. GET ALL THE WATCHLISTS
    var loadModel = function() {
    	//WOAH LOOK ITS A JS OBJECT
    	var model = {
    		//ARE THERE WATCHLISTS? GET THEM. ELSE, DON'T
    		watchlists: localStorage['StockDog.watchlists'] ?
    			JSON.parse(localStorage['StockDog.watchlists']): [],
    		//NEXTID IS USED TO GET THE ID ASSOCIATED WITH A WATCHLIST?
    		nextId: localStorage['StockDog.nextId'] ?
    			parseInt(localStorage['StockDog.nextId']) : 0
    	};
    	return model;
    };

    // [2] SAVE SOME WATCHLISTS TO STORAGE
    var saveModel = function(){
    	localStorage['StockDog.watchlists'] = JSON.stringify(Model.watchlists); 
    	localStorage['StockDog.nextId'] = Model.nextId;
    };

    // [3] FIND A WATCHLIST USING AN ID
    var findById = function(listId){
    	return _.find(Model.watchlists, function(watchlist){ //_.find is magical bit of haskell grabbing watchlist which meets crieteria
    		return watchlist.id === parseInt(listId); //=== is v strict about types
    	});
    };
    // [4] EMPTY RETURN ALL WATCHLISTS OR RETURN A SPECIFIC ONE IF TOLD TO
    this.query = function(listId){
    	if(listId){
    		return findById(listId);
    	} else {
    		return Model.watchlists;
    	}
    };

    // [5] ADD + SAVE A NEW WATCHLIST TO THE ALL ENCOMPASSING OBJECT
    this.save = function(watchlist){
    	watchlist.id = Model.nextId++;
    	Model.watchlists.push(watchlist);
    	saveModel();
    };

    // [6] REMOVE A WATCHLIST + SAVE THE ALL ENCOMPASSING OBJECT
    this.remove = function(watchlist){
    	_.remove(Model.watchlists, function(list){ //_.remove is a magical bit of haskell that removes things fitting a criteria
    		return list.id == watchlist.id;	
    	});
    	saveModel();
    };
    //[7] HOHOHO I HAVE NOW STARTED THE MODEL
    var Model = loadModel();
  });
