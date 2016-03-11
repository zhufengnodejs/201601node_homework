
var bu1=new Buffer('今天天好');
var bu2=new Buffer('就是有点冷');
var bu3=new Buffer('哈哈哈哈');
var bufLength=bu1.length+bu2.length+bu3.length;

function newConcat(newArry,bufLength) {
	if(newArry.length==0){
		throw new Error('最少传一个值');
		return
	}
	var arry = new Buffer(bufLength);//建一个跟数组长度一样的buffer
	var arryCount = 0;
	newArry.forEach(function (arrySingle) {
		arrySingle.copy(arry, arryCount);
		//让数组中的每一项去替换新创建的buffer
		arryCount += arrySingle.length;
		//让每次替换的length值等于上一次数组这一项的长度，下次接着在上一次的基础上复制到新的buffer中
	})
	return arry
}
var a=newConcat([bu1,bu2,bu3],bufLength)
console.log(a.toString('utf-8'));