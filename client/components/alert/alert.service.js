'use strict';

angular.module('shaastraApp')
    .directive('alertDirective', function ($http, $compile) {
    	return {
    		restrict: 'E',
    		scope: {
    			type: '=kind',
    			msg: '=msg'
    		},
    		templateUrl: 'components/alert/alert.html'
    	};
	});