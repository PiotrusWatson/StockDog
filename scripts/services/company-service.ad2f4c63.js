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
  	//uses resource service to get a companies.json file from file system, turns into obj
    return $resource('companies.json');
  });
