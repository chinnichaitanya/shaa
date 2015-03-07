'use strict';

angular.module('shaastraApp')
  .controller('DashboardCtrl', function ($scope, $location, $http, DashService, FormService, Auth) {

    $scope.updated = false;
    $scope.form = {};
    $scope.message = {};
    
    // checking if already applied or not
    if(Auth.getCurrentUser()._id) {
      if(Auth.getCurrentUser().applied_for[0]) {
        $scope.applying = Auth.getCurrentUser().applied_for[0];
        $scope.updated = true;
      }
    } else {
      $location.path('/login');
    }

    // loading all the departments available
    $scope.options = DashService.options;

    // loading the corresponding form details
    if($scope.updated) {
      FormService.formByCategory($scope.applying.value).then(function(form) {
        
        $scope.form = form;

        // checking if 'form' is existing and the value is zero or not
        if(form._id) {
          $scope.formPresent = 1;
        } else {
          $scope.formPresent = 0;
        }
        // console.log(form);
      }); 
    } else {
      $scope.form = {};
    }

    // loading the submitted values
    if($scope.updated) {
      FormService.formValues($scope.applying.value).then(function(responses) {
        $scope.formResponses = responses;
      });
    } else {
      $scope.formResponses = '';
    }
      
    $scope.updateUser = function() {
      if($scope.applying && Auth.getCurrentUser()._id) {
        $http.post('/api/users/update', { id: Auth.getCurrentUser()._id, applying: $scope.applying })
          .success(function(message) {
            // console.log(message);
            $scope.message = message;
          })
          .error(function(message) {
            $scope.message = message;
          });

        $scope.updated = true;
        window.location.reload();
      } else {
        window.alert('Please select your preference!')
      }
    };

    $scope.emptyAlerts = function() {
      $scope.message = {};
    };
  });
