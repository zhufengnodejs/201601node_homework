function concat(){
	var str = "";
	for(var i=0; i < arguments.length-1;i++){
		str += arguments[i].toString();
	}
	var buffer = new Buffer(str,arguments[i]);
	return buffer;
}

var abc = new Buffer("abc");
var bcd = new Buffer("bcd");
var constr = concat(abc,bcd);
console.log(constr.toString());