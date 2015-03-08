'use strict';

angular.module('shaastraApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'ui.utils',
  'permission'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth, Permission) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });

    /**
     * Defining all the roles
     */
    Permission
      .defineRole('anonymous', function(stateParams) {
        if(Auth.isLoggedIn()) {
          var currUser = Auth.getCurrentUser();
          if(currUser) {
            return false;
          }
        }
        return true;
      })
      .defineRole('user', function(stateParams) {
        if(Auth.isLoggedIn()) {
          var currUser = Auth.getCurrentUser();
          if(currUser.role === 'user') {
            return true;
          }
        }
        return false;        
      })
      .defineRole('admin', function(stateParams) {
        if(Auth.isLoggedIn()) {
          var currUser = Auth.getCurrentUser();
          if(currUser.role === 'admin') {
            return true;
          }
        }
        return false;        
      });
  });