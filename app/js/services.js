'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('mojenn.services', [])
	.value('version', 'alpha.1')
  	.factory('markdown', [function () {
  		var convertMD = function(md){ 
  			var converter = new Showdown.converter();
  			return converter.makeHtml(md); 
  		}
	    return {
	    	convert: function(md){
	    		return convertMD(md);
	    	}
	    };
  	}]);
