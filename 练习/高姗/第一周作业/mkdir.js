var fs=require('fs');
function createMkdir(path){
	var newPath=path.split("/");
	var pathObj='';
	console.log(newPath);
	newPath.forEach(function(path){
		pathObj+='/'+path;//累加路径
		try{
			fs.mkdirSync('.'+pathObj);//同步创建，只有在这个文件存在的时候才创建
		}catch(e){
            console.log('你已经创建过了')
		}
	})

}
createMkdir('一级/二级/四级/五级/六级')
/*fs.mkdir('./一级/');
 fs.mkdir('./一级/二级')
 fs.mkdir('./一级/二级/三级')*/