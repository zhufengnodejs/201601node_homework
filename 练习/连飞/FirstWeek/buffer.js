

var concat=require("./concat.js");

var buf1=new Buffer("珠");
var buf2=new Buffer("峰");
var buf3=new Buffer("培");
var buf4=new Buffer("训");

console.log(concat([buf1,buf2],6).toString());