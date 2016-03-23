'use strict';

var Guess = angular.module('Guess', ['GuessController']);

var GuessController = angular.module('GuessController', []);

GuessController.controller('basicController', ['$scope', '$http', function($scope, $http) {
    var message = $scope.message = "Welcome to this game engine ! Write here your map and please end each line with a '\n'";
    var map = $scope.map = "";
    $scope.render = [];
    var indexes = [];

    $scope.generate = function(input){
        $scope.render = [];
        indexes = [];

        var sub = input;

        while (sub.lastIndexOf('\n') != -1)
        {
            indexes.push(sub.lastIndexOf('\n'));
            sub = sub.slice(0, sub.lastIndexOf('\n'));
        }
        indexes.push(0);

        if (indexes.length > 1)
        {
            for (var i = 1; i < indexes.length; i++)
            {
                // alert(input.slice(indexes[i]+1, indexes[i-1]));
                $scope.render.push(input.slice(indexes[i]+1, indexes[i-1]));
            }
        }
        $scope.render.reverse();
    }
}]);