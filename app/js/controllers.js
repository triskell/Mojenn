'use strict';

/* Controllers */

angular.module('mojenn.controllers', []).
	controller('MainCtrl', ['$scope', function($scope) {
		$scope.website = {
			name : "<< Name Here >>"
		}
	}])
	.controller('navCtrl', ['$scope', '$http', function($scope, $http) {
		$http.get('/pages').success(function(data) {
			$scope.pages = data;
		});
	}])
	.controller('homeCtrl', ['$scope', function($scope) {
		
	}])
	.controller('pageCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
		$http.get('/pages/' + $routeParams.pageId).success(function(data) {
			$scope.page = data;
		});
	}])
	.controller('blogCtrl', ['$scope', '$http', function($scope, $http) {
		$http.get('/blog').success(function(data) {
			$scope.blog = data;
		});
	}])
	.controller('postCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
		$http.get('/blog/' + $routeParams.postId).success(function(data) {
			$scope.post = data;
		});
	}]);