'use strict';

angular.module('shaastraApp')
  .service('FormService', function FormService($http) {

    var formsJsonPath = './static-data/sample_forms.json';

    return {
        fields:[
            {
                name : 'Textfield',
                value : 'textfield'
            },
            {
                name : 'E-mail',
                value : 'email'
            },
            {
                name : 'Password',
                value : 'password'
            },
            {
                name : 'Radio Buttons',
                value : 'radio'
            },
            {
                name : 'Dropdown List',
                value : 'dropdown'
            },
            {
                name : 'Date',
                value : 'date'
            },
            {
                name : 'Text Area',
                value : 'textarea'
            },
            {
                name : 'Checkbox',
                value : 'checkbox'
            },
            {
                name : 'Hidden',
                value : 'hidden'
            }
        ],
        roles:[
            {
                name : 'All can view',
                value : 'All'
            },
            {
                name : 'Only cores can view',
                value : 'Cores'
            },
            {
                name : 'Only cores and coords can view',
                value : 'Cores_Coords'
            }
        ],
        formById: function (id) {
            // $http returns a promise, which has a then function, which also returns a promise
            // if id === 0, this service returns list of all the forms
            return $http.get('/api/forms/' + id).then(function (response) {
                var requestedForm = {};
                requestedForm = response.data;
                return requestedForm;
            });
        },
        formByCategory: function (category) {
            // $http returns a promise, which has a then function, which also returns a promise
            return $http.get('/api/forms/dashFormFields/' + category).then(function (response) {
                // console.log(response.data._id);    
                var requestedForm = {};
                requestedForm = response.data;
                return requestedForm;
            });
        },
        formValues: function(category) {
            // $http returns a promise, which has a then function, which also returns a promise
            return $http.get('/api/forms/dashFormValues/' + category).then(function (response) {
                // console.log(response.data);    
                var requestedValues = {};
                requestedValues = response.data;
                return requestedValues;
            });            
        },
        formValuesAll: function(category) {
            // $http returns a promise, which has a then function, which also returns a promise
            return $http.get('/api/forms/adminFormValues/' + category).then(function (response) {
                // console.log(response.data);    
                var requestedValues = {};
                requestedValues = response.data;
                return requestedValues;
            });            
        },
        forms: function() {
            return $http.get(formsJsonPath).then(function (response) {
                return response.data;
            });
        }
    };
});
