'use strict';

angular.module('experiment', ['app.directives'])
  .controller('Ctrl', ['$scope', function ($scope) {

    $scope.test = function(command){
      $scope.module = {};

      var words = s.words(command);
      if (words[0] == "new" && words.length > 2){
        if(words[1] == "module") {
          var module = words[2];
          $scope.trigger = 1;
          $scope.module = {
            name: s.capitalize(module),
            url: module, ctrl: s.capitalize(module) + "Ctrl",
            baseState: module }
        }
        if(_.contains(words, "resolve")) {
          var ref = _.indexOf(words, "resolve");

          if (words[ref + 1]) {
            var r_name = words[ref + 1];
            var r_type = words[ref + 2] ? words[ref + 2]: "list";

            $scope.module.resolve = {
              name: r_type == "list" ? r_name + "s" : r_name,
              url: r_type == "list" ? "'" + r_name + "s'" : "'" + r_name + "', $stateParams.id",
              count: r_type == "list" ? "all" : "one",
              single: r_type == "list" ? false : true,
              method: r_type == "list" ? "getList" : "get",
              params: r_type == "list" ? "" : "$stateParams,",
              paramss: r_type == "list" ? "" : "'$stateParams'," }
          }
        }
      }
    }

  }])
;
