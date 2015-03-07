'use strict';

angular.module('shaastraApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl',
        data: {
        	permissions: {
        		only: ['admin'],
        		redirectTo: 'dashboard'
        	}
        }
      });
  });