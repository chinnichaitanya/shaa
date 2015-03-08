'use strict';

angular.module('shaastraApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/main',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        data: {
        	permissions: {
        		except: ['admin', 'user', 'anonymous'],
        		redirectTo: 'home'
        	}
        }        
      });
  });