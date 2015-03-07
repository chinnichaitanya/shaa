'use strict';

angular.module('shaastraApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('formsCreate', {
        url: '/forms/create',
        templateUrl: 'app/forms/create/create.html',
        controller: 'CreateCtrl',
        data: {
          permissions: {
            only: ['admin'],
            redirectTo: 'dashboard'
          }
        }        
      })
      .state('formsView', {
        url: '/forms/view/:id',
        templateUrl: 'app/forms/view/view.html',
        controller: 'ViewCtrl',
        data: {
          permissions: {
            except: ['anonymous'],
            redirectTo: 'login'
          }
        }        
      });
  });