'use strict';

/* Controllers */

angular.module('mojenn.controllers', []).
	controller('MainCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
		$rootScope.app = {
			name : 'Trysk.net',
			version : 'alpha.1',
			author : 'Thomas \'Trysk\' Abot'
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
	}])
	.controller('adminCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
		$http.get('/admin').success(function(data, status, headers, config) {
	      $scope.admin = data;
	    }).
	    error(function(data, status, headers, config) {
	      	console.log("-> Error : " + status);
			$scope.admin = {
				test : "ERROR : " + status
			};
	    });

	    $scope.publishPost = function(){
	    	$scope.publish('post');
	    }

	    $scope.publishPage = function(){
	    	$scope.publish('page');
	    }

	    $scope.publish = function(type){
	    	$http.post('/content', 
	    		{
	    			type: type,
	    			title: $scope.editor_title,
	    			body: $scope.editor_body
	    		}
	    	).success(function(data) {
				console.log = data;
			}).error(function(data) {
				console.log = data;
			});
	    }
	}]);