'use strict';

/**
 * @ngdoc service
 * @name stockDogApp.CompanyService
 * @description
 * # CompanyService
 * Service in the stockDogApp.
 */
angular.module('stockDogApp')
  .service('CompanyService', function CompanyService($resource) {
  	//returns some companies :)
    return $resource('companies.json');
  });
