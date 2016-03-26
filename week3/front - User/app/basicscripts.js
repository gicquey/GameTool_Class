var basicScript = function() {
	window.onkeyup = function(e) {
		var key = e.keyCode ? e.keyCode : e.which;

		switch (key) {
			case 37:
				//RIGHT
				alert("I want to go RIGHT");
			case 38:
				//DOWN
			case 39:
				//LEFT
			case 40:
				//UP	
		}
	}
}