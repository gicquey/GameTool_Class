var allScripts = [];

var nullScripts = {onCreate:null, update:null, onHit:null, onDestroy:null};

//----------------------------------------\\
var plateformOnCreate = function($scope, object){
	object.way = 1;
}
var plateformUpdate = function($scope, object){
	if (object.pos.x >= $scope.map.width - 2){
		object.way = -1;
	}
	if (object.pos.x <= 1){
		object.way = 1;
	}
	object.pos.x += object.way;
}
var plateformOnDestroy = function(object){
	alert("oh :'(");
	delete object;
}
var plateformScripts = {onCreate: plateformOnCreate, update: plateformUpdate, onHit:null, onDestroy: plateformOnDestroy};
//----------------------------------------\\

//----------------------------------------\\
var cOnCreate = function($scope, object) {
    var keys = {};
    object.jumping = 0;
    var obj = null;
    var key = false;

    window.onkeydown = function (e) {
        keys["key" + e.which] = true;
    }
    object.isKeyDown = function (code) {
        if (keys["key" + code]) {
            return true;
        }
        return false;
    }
    object.clearKeyEvent = function() {
        for (var code in keys) {
            if (keys.hasOwnProperty(code)) {
                keys[code] = false;
            }
        }
    }
}
var cUpdate = function($scope, object) {
	if (object.isKeyDown(39) && object.hits.r != 1 && object.hits.r != 2) { //RIGHT
		object.pos.x++;
    } else if (object.isKeyDown(37) && object.hits.l != 1 && object.hits.l != 2) { //LEFT
		object.pos.x--;
    }

    if (object.isKeyDown(38)) { //UP
		if (object.jumping == 0 && (object.hits.d == 1 || object.hits.d == 2)) {
			object.jumping += 4;
		}
    } else if (object.isKeyDown(40)) { //DOWN
    }

    if (object.jumping > 0) {
		if (object.hits.u == 1 || object.hits.u == 2) {
			object.jumping = 1;
			if (object.pos.y < $scope.map.height - 2 && object.hits.d != 1 && object.hits.d != 2) {
				object.pos.y++;
			}
		} else if (object.pos.y >= 2) {
			object.pos.y--;
    	}
    	object.jumping--;
    } else if (object.pos.y < $scope.map.height - 2 && object.hits.d != 1 && object.hits.d != 2) {
    	object.pos.y++;
    } else if (object.hits.d == 2) {
    	if (object.hits.r == 1 || object.hits.r == 2) {
			object.pos.x -= 1;
    	}
		else if (object.hits.l == 1 || object.hits.l == 2) {
			object.pos.x++;
		}
		else {
	    	obj = object.getObjectAt(2, object.pos.x, object.pos.y+1);
	    	if (obj && obj.way) {
				object.pos.x += obj.way;
			}
		}
	}

    object.clearKeyEvent();

	if (obj = object.getObjectAt(4, object.pos.x, object.pos.y))
	{
		key = true;
		obj.toDestroy = true;
	}

	if (obj = object.getObjectAt(5, object.pos.x, object.pos.y))
	{
		if (key == true)
		{
			obj.toDestroy = true;
		}
	}
}

var characterScripts = {onCreate: cOnCreate, update: cUpdate, onHit:null, onDestroy: null};
//----------------------------------------\\

//----------------------------------------\\
var doorOnCreate = function($scope, object){
}
var doorUpdate = function($scope, object){
}
var doorOnDestroy = function(object){
	alert("You WON the game !!! Well played ! ^_^");
	object.pos.x = object.pos.y = -1;
	object.toDestroy = false;
}
var doorScripts = {onCreate: doorOnCreate, update: doorUpdate, onHit:null, onDestroy: doorOnDestroy};
//----------------------------------------\\

//----------------------------------------\\
var keyOnCreate = function($scope, object){
}
var keyUpdate = function($scope, object){
}
var keyOnDestroy = function(object){
	object.pos.x = object.pos.y = -1;
	object.toDestroy = false;
}
var keyScripts = {onCreate: keyOnCreate, update: keyUpdate, onHit:null, onDestroy: keyOnDestroy};
//----------------------------------------\\k

allScripts.push(nullScripts);
allScripts.push(nullScripts);
allScripts.push(plateformScripts);
allScripts.push(characterScripts);
allScripts.push(keyScripts);
allScripts.push(doorScripts);