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
  $routeProvider.when('/page/:pageId', {templateUrl: 'partials/page.html', controller: 'pageCtrl'});
  $routeProvider.when('/blog/', {templateUrl: 'partials/blog.html', controller: 'blogCtrl'});
  $routeProvider.when('/blog/:postId', {templateUrl: 'partials/post.html', controller: 'postCtrl'});
  $routeProvider.when('/admin', {templateUrl: 'partials/admin.html', controller: 'adminCtrl'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);
