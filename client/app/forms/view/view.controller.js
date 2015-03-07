'use strict';

var ViewCtrl = angular.module('shaastraApp').controller('ViewCtrl', function ($scope, FormService, $stateParams, $http) {
    $scope.form = {};
	// read form with given id
	FormService.formById($stateParams.id).then(function(form) {
		$scope.form = form;
		// console.log(form);
	});
});
