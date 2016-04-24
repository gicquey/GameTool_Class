'use strict';

var Guess = angular.module('Guess', ['GuessController']);

var GuessController = angular.module('GuessController', []);

var app = function($scope, $http) {
    var message = $scope.message = "Welcome to this game engine !";
    $scope.step = 1;

    $scope.map = [];
    $scope.map.width = 16;
    $scope.map.height = 16;

    $scope.input = [];
    $scope.input.name = "";    
    $scope.input.code = null;
    $scope.input.num = null;

    $scope.types = [];

    var objects = [];
    var intervalID = null;

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
        for (var i = 0; i < $scope.map.height * $scope.map.width; i++){
            $scope.spriteMap[i] = 0;
        }
    }

    $scope.createType = function(name, num){
        $scope.types.push({name: name, num: num});
    }
    $scope.deleteType = function(){
        $scope.types.pop();
    }

    $scope.assign = function(code, num){
    }

    $scope.style = function(value){
        var ret = (value * 20) + "px";
        return { "width": ret };
    }

    var getObjectAt = function(type, x, y){
        for (i = 0; i < objects.length; i++) {
            if (objects[i].pos.x == x && objects[i].pos.y == y && objects[i].type == type)
                return objects[i];
        }
        return null;
    }

    var getGravAttr = function(num){
        var iterator = $scope.types.keys();
        var i = iterator.next();

        while (i.done == false)
        {
            if ($scope.types[i.value].num == num)
                return ($scope.types[i.value].grav);
            i = iterator.next();
        }
        return false;
    }

    var createAsset = function(num, posx, posy){
        objects.push({type:num, pos:{x:posx, y:posy}, scripts:allScripts[num], toDestroy:false, hits:{u:0, r:0, d:0, l:0}, getObjectAt:getObjectAt});
    }

    var createObject = function(num, pos){
        var x = parseInt(pos % $scope.map.width);
        var y = parseInt(pos / $scope.map.width);
        switch (num)
        {
            case 0:
                break;
            default:
                createAsset(num, x, y);// + , script);
                break;
        }
    }

    $scope.generate = function(){
        objects = [];
        for (var i = 0; i < $scope.spriteMap.length; i++) {
            createObject($scope.spriteMap[i], i);
        }
        for (i = 0; i < objects.length; i++) {
            if (objects[i].scripts.onCreate != null) {
                objects[i].scripts.onCreate($scope, objects[i]);
            }
        }

        function gameLoop() {
            var i;

            $scope.$apply(function () {
                for (i = 0; i < objects.length; i++) {
                    objects[i].hits.u = $scope.spriteMap[objects[i].pos.x + (objects[i].pos.y-1) * $scope.map.width];
                    objects[i].hits.r = $scope.spriteMap[objects[i].pos.x + 1 + objects[i].pos.y * $scope.map.width];
                    objects[i].hits.d = $scope.spriteMap[objects[i].pos.x + (objects[i].pos.y+1) * $scope.map.width];
                    objects[i].hits.l = $scope.spriteMap[objects[i].pos.x - 1 + objects[i].pos.y * $scope.map.width];
                }
                for (i = 0; i < objects.length; i++) {
                    $scope.spriteMap[objects[i].pos.x + objects[i].pos.y * $scope.map.width] = 0;
                }
                for (i = 0; i < objects.length; i++) {
                    if (objects[i].scripts.update != null) {
                        // alert(objects[i].type + " at " + (objects[i].pos.x + "/" + objects[i].pos.y));
                        objects[i].scripts.update($scope, objects[i]);
                    }
                }
                for (i = 0; i < objects.length; i++) {
                    if (objects[i].toDestroy == true && objects[i].scripts.onDestroy != null) {
                            objects[i].scripts.onDestroy(objects[i]);
                    }
                }
                for (var i = objects.length - 1; i >= 0; i--) {
                    $scope.spriteMap[objects[i].pos.x + objects[i].pos.y * $scope.map.width] = objects[i].type;
                }
            });
        }
        var intervalID = setInterval(gameLoop, 100);
    }

    $scope.stop = function(){
        clearInterval(intervalID);
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
}

GuessController.controller('basicController', ['$scope', '$http', function($scope, $http) {app($scope, $http)}]);