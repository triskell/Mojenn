'use strict';


// Declare app level module which depends on filters, and services
angular.module('mojenn', [
  'ngRoute',
  'mojenn.filters',
  'mojenn.services',
  'mojenn.directives',
  'mojenn.controllers',
  'ui.ace'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/home.html', controller: 'homeCtrl'});
  $routeProvider.when('/install', {templateUrl: 'partials/install.html', controller: 'installCtrl'});
  $routeProvider.when('/success', {templateUrl: 'partials/success.html', controller: 'successCtrl'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);
