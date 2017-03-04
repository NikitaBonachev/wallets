'use strict';

angular.
  module('userList').
  component('userList', {
    templateUrl: 'user-list/user-list.template.html',
    controller: [
      'User',
      '$location',
      function (User, $location) {
        var self = this;
        var params = {
          limit: 4,
          offset: 0
        };
        User(params, function (resp) {
          self.users = resp.data.data;
        });
        self.openUser = function (userId) {
          $location.path('/users/' + userId);
        }
      }
    ]
  });
