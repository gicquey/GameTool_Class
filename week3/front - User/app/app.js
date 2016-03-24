'use strict';

var Guess = angular.module('Guess', ['GuessController']);

var GuessController = angular.module('GuessController', []);

GuessController.controller('basicController', ['$scope', '$http', function($scope, $http) {
    var message = $scope.message = "Welcome to this game engine !";
    $scope.step = 1;

    $scope.map = [];
    $scope.map.width = 21;
    $scope.map.height = 16;

    $scope.input = [];
    $scope.input.name = "";    
    $scope.input.code = null;
    $scope.input.num = null;
    $scope.input.grav = false;

    $scope.objects = [];

    $scope.spriteMap = [];
    for (var i = 0; i < $scope.map.height * $scope.map.width; i++)
    {
        // if (i < 21 || i % 21 == 0 || i % 21 == 20 || i >= 15*21)
        if (i < $scope.map.width || i % $scope.map.width == 0
            || i % $scope.map.width == ($scope.map.width-1)
            || i >= ($scope.map.height-1) * ($scope.map.width))
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
    $scope.reset = function(){
        $scope.spriteMap = [];
        for (var i = 0; i < $scope.map.height * $scope.map.width; i++)
        {
            $scope.spriteMap[i] = 0;
        }

    }

    $scope.createType = function(name, num, grav){
        $scope.objects.push({name: name, num: num, grav: grav});
    }
    $scope.deleteType = function(){
        $scope.objects.pop();
    }

    $scope.assign = function(code, num){

    //     window.onkeyup = function(e) {
    // var key = e.keyCode ? e.keyCode : e.which;
    
    // if (key == 38) {
    //     playerSpriteX += 10;
    // }else if (key == 40) {
    //     playerSpriteX -= 10;
    //    }
    }

    $scope.style = function(value){
        var ret = (value * 20) + "px";
        return { "width": ret };
    }

    var getGravAttr = function(num){
        var iterator = $scope.objects.keys();

        while (iterator.done == false)
        {
            iterator.next();
            if (iterator.value.num == num)
            {
                return (iterator.value.grav);
            }
        }
        return false;
    }

    var createAsset = function(grav)
    {
        alert("TODO");
    }

    var createWall = function() {
        alert("WALL");
    }

    var createObject = function(num){
        switch (num)
        {
            case 0:
                break;
            case 1:
                createWall();
                break;
            default:
                createAsset(getGravAttr(num));// + , script);
                break;
        }
    }

    $scope.generate = function(){
        for (var i = $scope.spriteMap.length - 1; i >= 0; i--) {
            createObject($scope.spriteMap[i]);
        }
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