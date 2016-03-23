'use strict';

var Guess = angular.module('Guess', ['GuessController']);

var GuessController = angular.module('GuessController', []);

GuessController.controller('basicController', ['$scope', '$http', function($scope, $http) {
    var message = $scope.message = "Welcome to this game engine !";
    var map = $scope.map = "";
    $scope.render = [];
    var indexes = [];

    $scope.step = 1;

    $scope.spriteMap = [];
    for (var i = 0; i < 16 * 21; i++)
    {
        if (i < 21 || i % 21 == 0 || i % 21 == 20 || i >= 15*21)
            $scope.spriteMap[i] = 1;
        else
            $scope.spriteMap[i] = 0;
    }

    $scope.mapEdit = function(block){
        if ($scope.spriteMap[block] == $scope.step)
            $scope.spriteMap[block] = 0;
        else
            $scope.spriteMap[block] = $scope.step;
    }

    $scope.nextStep = function(){
        $scope.step++;
    }
    $scope.prevStep = function(){
        $scope.step--;
    }

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

    function createArray(length) {
        var arr = new Array(length || 0),
            i = length;

        if (arguments.length > 1) {
            var args = Array.prototype.slice.call(arguments, 1);
            while(i--) arr[length-1 - i] = createArray.apply(this, args);
        }
        return arr;
    }
}]);