'use strict';

var Guess = angular.module('Guess', ['GuessController']);

var GuessController = angular.module('GuessController', []);

GuessController.controller('basicController', ['$scope', '$http', function($scope, $http) {
    var message = $scope.message = "Welcome !";
    var inputs = $scope.inputs = "";
    var instanceId = 0;

    $scope.CheckAnswer = function(input){
        $http({
            method: 'GET',
            url: 'http://localhost:8181/api/game/player/answers/' + input,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        .then(function successCallback(response) {
            if (response.status == 200) {
                if (instanceId != response.data.instanceID)
                {
                    alert("The game has been updated !");
                    instanceId = response.data.instanceID;
                }
                if (response.data.result == true)
                    $scope.message = "GG !";
                else
                    $scope.message = "You lost this time, try again dude :3";
            }
        }, function errorCallback(response) {
            alert("errorCallback");
        });
    }
}]);