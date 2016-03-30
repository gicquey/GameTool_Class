var allScripts = [];

var nullScripts = {onCreate:null, update:null, onHit:null, onDestroy:null};

//----------------------------------------\\
var plateformOnCreate = function($scope, object){
	object.ownerVariable = 1;
}
var plateformUpdate = function($scope, object){
	if (object.pos.x >= $scope.map.width - 2){
		object.ownerVariable = -1;
	}
	if (object.pos.x <= 1){
		object.ownerVariable = 1;
	}
	object.pos.x += object.ownerVariable;
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

    window.onkeydown = function (e) {
        keys["key" + e.which] = true;
    }
    object.isKeyDown = function (code) {
        console.log(keys["key" + code]);
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
	if (object.isKeyDown(39)) { //RIGHT
		object.pos.x++;
    } else if (object.isKeyDown(37)) { //LEFT
		object.pos.x--;
    }

    if (object.isKeyDown(38)) { //UP
		if (object.jumping == 0) {
			object.jumping += 4;
		}
    } else if (object.isKeyDown(40)) { //DOWN
    }

    if (object.jumping > 0) {
    	//TO reDO condition considering walls (onHits)
    	if (object.pos.y >= 2)
    		object.pos.y--;
    	object.jumping--;
    } else if (object.pos.y < $scope.map.height - 2) {
    	object.pos.y++;
    }

    object.clearKeyEvent();
}

var characterScripts = {onCreate: cOnCreate, update: cUpdate, onHit:null, onDestroy: null};
//----------------------------------------\\

allScripts.push(nullScripts);
allScripts.push(nullScripts);
allScripts.push(characterScripts);
allScripts.push(plateformScripts);

	// window.onkeyup = function(e) {
	// 	var key = e.keyCode ? e.keyCode : e.which;

	// 	switch (key) {
	// 		case 37:
	// 			//LEFT
	// 		case 38:
	// 			//UP
	// 		case 39:
	// 			//RIGHT
	// 		case 40:
	// 			//DOWN
	// 		default:
	// 			alert("key pressed : " + key);
	// 			break;
	// 	}
	// }