'use strict';

angular.module('shaastraApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User, FormService, DashService, socket) {

    // // Use the User $resource to fetch all users
    // $scope.users = User.query();

    // $scope.delete = function(user) {
    //   User.remove({ id: user._id });
    //   angular.forEach($scope.users, function(u, i) {
    //     if (u === user) {
    //       $scope.users.splice(i, 1);
    //     }
    //   });
    // };

    // getting all the forms
    $scope.allForms = '';
    $scope.applying = '';
    $scope.message = '';

    FormService.formById(0).then(function(responses) {
      if(responses.length != 0) {
        $scope.allForms = responses;
        // socket.syncUpdates('form', $scope.allForms);
      } else {
        $scope.allForms = '';
      }
    });


    // getting all the categories
    $scope.options = DashService.options;

    // changes the $scope.applying value and thereby search all the responses w.r.t category
    $scope.changeTo = function(value) {
      $scope.applying = value;
      $scope.formResponses = '';

// NEED TO OPTIMIZE THIS THING BUT HOW ???

// getting all the responses of a particular category
      FormService.formValuesAll($scope.applying).then(function(responses) {
        // using responses.length because responses has one element if there are no responses for that form
        if(responses.length != 0) {
          $scope.formResponses = responses;
        } else {
          $scope.formResponses = '';
        }
      });
    };

    // // destroy a particular form
    // $scope.destroy = function(id) {
    //   $http.post('/api/forms/delete', { del_id: id })
    //     .success(function(message) {
    //       $scope.message = message;
    //       window.location.reload();
    //     })
    //     .error(function(message) {
    //       $scope.message = '';
    //     });
    // }

    // removing all the messages in scope 
    $scope.closeAlert = function() {
      $scope.message = {};
    }

    $scope.open_pdf = function(task, data, formName) {
      // console.log(formName);
      // console.log(data);
      // console.log(data.values.length);
      // console.log(data.values[0]);

      // var put = {};
      // put['tit'] = 'yoy';
      // console.log(put);

      // var put = [];
      // put.push({text : formName, style : 'title'});
      // put.push({text : formName, style : 'ccc'});
      // console.log(put);

      // for(var i=0; i<data.values.length; i++) {
      //   var n = data.values[i];
      //   put[n] = 
      // }


      // source: https://github.com/bpampuch/pdfmake
      var put = [];
      // margin: [left, top, right, bottom]
      put.push({text: formName, style: 'title', margin: [0, 5, 0, 10]});
      put.push({text: data.userName, style: 'name', margin: [0, 0, 0, 5]});
      put.push({text: data.userEmail, style: 'name', margin: [0, 0, 0, 5]});
      for(var i=0; i<data.values.length; i++) {
        var heading = data.values[i];
        put.push({text: heading.field_title, style: 'heading', margin: [0, 10, 0, 5]});
        if(heading.field_type != 'radio' && heading.field_type != 'dropdown') {
          put.push({text: heading.field_value, style: 'response', margin: [0, 0, 0, 10]});
        }
        if(heading.field_type === 'radio' || heading.field_type === 'dropdown') {
          var j = heading.field_value - 1;
          put.push({text: heading.field_options[j].option_title, style: 'response', margin: [0, 0, 0, 10]});
        }
      }      
      var pdf = {
        pageSize: 'A4',
        pageOrientation: 'potrait',
        pageMargins: [50, 60, 50, 60],
        // background: function(currentPage) {
        //   return 'Page - ' + currentPage
        // },
        footer: function(currentPage, pageCount) { 
          return {text: currentPage.toString() + ' of ' + pageCount, alignment: 'center'}; 
        },
        // header: function(currentPage, pageCount) {
        //   // you can apply any logic and return any valid pdfmake element
        //   return { text: 'simple text', alignment: ((currentPage+1) % 2) ? 'left' : 'right' };
        // },
        content: put,
        name: 'dadas',
        styles: {
          title: {
            fontSize: 32,
            bold: true,
            alignment: 'center',
            color: '#0000CC'
          },
          heading: {
            fontSize: 18,
            bold: true,
            alignment: 'left',
            color: '#3366FF'
          },
          response: {
            fontSize: 14,
            alignment: 'left',
          },
          name: {
            fontSize: 18,
            alignment: 'center',
            color: '#4D4D4D'
          }
        }
      }
      if(task === 'open') {
        var name = formName + ' ' + data.userName;
        pdfMake.createPdf(pdf).open(name);
      }
      if(task === 'download') {
        var name = formName + ' ' + data.userName;
        pdfMake.createPdf(pdf).download(name);
      }
    }

    // $scope.$on('$destroy', function () {
    //   console.log('tee');
    //   socket.unsyncUpdates('form');
    // });    

  });
