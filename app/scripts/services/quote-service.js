'use strict';

/**
 * @ngdoc service
 * @name stockDogApp.QuoteService
 * @description
 * # QuoteService
 * Service in the stockDogApp.
 */
angular.module('stockDogApp')
  .service('QuoteService', function ($http, $interval, $sce) {
    // VAR INITIALIZATION
    var stocks = [];
    var BASE = 'http://query.yahooapis.com/v1/public/yql';

    //[1] UPDATES STOCK MODEL WITH QUOTE DATA
    var update = function(quotes){
    	if(quotes.length === stocks.length){ //surely this should never validate true?
    		_.each(quotes, function(quote, idx){
    			var stock = stocks[idx];
    			stock.lastPrice = parseFloat(quote.LastTradePriceOnly);
    			stock.change = quote.Change;
    			stock.percentChange = quote.ChangeinPercent;
    			stock.marketValue = stock.shares * stock.lastPrice;
    			stock.dayChange = stock.shares * parseFloat(stock.change);
    			stock.save();
    		});
    	}
    };

    // [2] HELP FUNCTIONS THAT ADD TO, REMOVE FROM AND CLEAR THE STOCK LIST ALSO TRUSTING :)
    this.register = function(stock){
    	stocks.push(stock);
    };
    this.deregister = function(stock){
    	_.remove(stocks, stock);
    };
    this.clear = function(){
    	stocks = [];
    };
    var trustSrc = function(src){
    	return $sce.trustAsResourceUrl(src);
    };

    //[3] LETS TALK TO YAHOO FINANCE TO GET SOME NICE QUOTES :)

    this.fetch = function() {
    	//gets all listed symbols from each
    	var symbols = _.reduce(stocks, function(symbols, stock){
    		symbols.push(stock.company.symbol);
    		return symbols;
    	}, []);
    //turn some SQL into the correct URI text to query quotes
    var query = encodeURIComponent('select * from yahoo.finance.quotes ' + 
    	'where symbol in (\'' + symbols.join(',') +'\')'); //where symbol in ('list,a,symbols')
    //slap this query into the full url
    var url = BASE + '?' + 'q=' + query + '&format=json&diagnostics=true' +
    	'&env=store://datatables.org/alltableswithkeys';
    $http.jsonp(trustSrc(url), {jsonpCallbackParam: 'callback'}) //lesgo get some JSON
    	.then(function (data) { //if we succeed
    		if (data.data.query.count) {
    			var quotes = data.data.query.count > 1 ?
    				data.data.query.results.quote : [data.data.query.results.quote];
    			update(quotes);
    		}
    	},
    	function(data) {//if we dont succeed
    		console.log(data); 
    	}); 
    };

    //[4] GET MORE DATA EVERY 5 SECONDS WOOP WOOP
    $interval(this.fetch, 5000);
  });
