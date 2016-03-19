'use strict';

var Guess = angular.module('Guess', ['GuessController']);

var GuessController = angular.module('GuessController', []);

GuessController.controller('basicController', ['$scope', '$http', function($scope, $http) {
    var message = $scope.message = "Welcome !";
    var inputs = $scope.inputs = "";
    var answers = $scope.answers = null;
    var answer = $scope.answer = 0;
    var instanceId = $scope.instanceID = 0;

    $scope.AddNumber = function(input){
        $http({
            method: 'POST',
            url: 'http://localhost:8181/api/game/admin/answers/' + input,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        .then(function successCallback(response) {
            if (response.status == 200) {
                if (instanceId != response.data.instanceID)
                {
                    alert("The game has been updated !");
                    instanceId = response.data.instanceID;
                }
                $scope.answer = response.data.currentNumber;
                $scope.answers = response.data.answers;
                $scope.message = response.data.message;
            }
        }, function errorCallback(response) {
            if (response.status == 422) {
                if (instanceId != response.data.instanceID)
                {
                    alert("The game has been updated !");
                    instanceId = response.data.instanceID;
                }
                $scope.answer = response.data.currentNumber;
                $scope.answers = response.data.answers;
                $scope.message = response.data.message;
            }
        });
    }

    $scope.getValues = function()
    {
        $http({
            method: 'GET',
            url: 'http://localhost:8181/api/game/admin/answers/',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        .then(function successCallback(response) {
            if (response.status == 200) {
                if (instanceId != response.data.instanceID)
                {
                    alert("The game has been updated !");
                    instanceId = response.data.instanceID;
                }
                $scope.answers = response.data.answers;
            }
        }, function errorCallback(response) {
            alert("errorCallback");
        });
    }

    $scope.getValue = function()
    {
        $http({
            method: 'GET',
            url: 'http://localhost:8181/api/game/admin/answers/current',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        .then(function successCallback(response) {
            if (response.status == 200) {
                if (instanceId != response.data.instanceID)
                {
                    alert("The game has been updated !");
                    instanceId = response.data.instanceID;
                }
                $scope.answer = response.data.currentAnswer;
            }
        }, function errorCallback(response) {
            alert("errorCallback");
        });
    }

    $scope.changeValue = function()
    {
        $http({
            method: 'PUT',
            url: 'http://localhost:8181/api/game/admin/answers/',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        .then(function successCallback(response) {
            if (response.status == 200) {
                if (instanceId != response.data.instanceID)
                {
                    alert("The game has been updated !");
                    instanceId = response.data.instanceID;
                }
                $scope.answer = response.data.currentAnswer;
                $scope.answers = response.data.answers;
                $scope.message = response.data.message;
            }
        }, function errorCallback(response) {
            alert("errorCallback");
        });
    }
}]);