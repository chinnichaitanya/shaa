'use strict';

angular.module('shaastraApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'DashboardCtrl',
        data: {
        	permissions: {
        		except: ['anonymous'],
        		redirectTo: 'dashboard'
        	}
        }        
      });
  });