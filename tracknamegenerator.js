// Ryan Beck 2019

var namesegments = ['a', 'b', 'c', 'd', 'e', 'f'];

function displayName() {
	var namelength = Math.floor(Math.random() * 15);
	if (namelength < 2) {
		namelength += 2;
	}
	var fullname = "";
		
		for (i = 0; i < namelength; i++) {
			var x = 32;
			do {
				x = Math.floor(Math.random() * 127);
			} while (x < 30);
			console.log(x);
			var xname = "";
			xname = String.fromCharCode(x);
			fullname = fullname.concat(xname);
		}

	document.getElementById("namedisplay").innerHTML = fullname;
}
