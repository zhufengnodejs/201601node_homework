/**
 * name:mkui v.02
 * author:闫宇韬   
 * update:2016-1-11  
 * QQ:867528315
 * descript: mkui不依赖于任何js框架,选择器符号$$或者m,只针对移动端开发,只兼容ie9+
 * github:https://github.com/yanyutao/mkui.git
 */

//前台调用
var m = window[m]= $$ = {};   //定义一个命名空间

m = $$ = function(str){       //将Mk对象中的私有属性和方法 赋给 m对象，并且还可以扩展
	return new Mk(str);
};

//基础库
function Mk(str,context){
	this.elements = []; //定义一个数组用来存dom元素
	if(typeof str == 'object'){ //如果传入进来的是this对象，就把它才到第一个数组中
		if(str != undefined){    //_this是一个对象，undefined也是一个对象，区别与typeof返回的带单引号的'undefined'
			this.elements[0] = str;
		}
	}else if(typeof str == 'function'){
		this.ready(str);
	}else{
		this.elements = (context || document).querySelectorAll(str);
	}
};

//插件入口
Mk.prototype.extend = function (name,callback) {
  Mk[name] = callback;
};

//dom加载完毕
Mk.prototype.ready = function(fn){
	document.addEventListener('DOMContentLoaded',function(){
		fn();
		//removeEvent(document, 'DOMContentLoaded', arguments.callee);
	},false);
};

//click方法
Mk.prototype.click = function (fn) {
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].addEventListener('click',fn,false);
	}
	return this;
};

//移动端单击方法
Mk.prototype.tap = function (fn) {
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].addEventListener('touchend',function(e){
			fn();
			e.preventDefault();
		},false);
	}
	return this;
};

//设置鼠标移入移出方法
Mk.prototype.hover = function(over,out){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].onmouseover = over;
		this.elements[i].onmouseout = out;
	}
	return this;
};

//添加class
Mk.prototype.addClass = function(str){
	for( var i = 0; i < this.elements.length; i++ ){
		if( this.elements[i].className == '' ){
			this.elements[i].className = str;
		}else if ( !this.elements[i].className.match(new RegExp( '(\\s|^)' + str + '(\\s|$)' )) ){
			this.elements[i].className += ' ' + str;
		}
	}
	return this;
};

//删除class
Mk.prototype.removeClass = function(str){
	for( var i = 0; i < this.elements.length; i++ ){
		if ( this.elements[i].className.match(new RegExp( '(\\s|^)' + str + '(\\s|$)' )) ){
			this.elements[i].className = this.elements[i].className.replace(new RegExp( '(\\s|^)' + str + '(\\s|$)' ) , '');
		}
	}
	return this;
};

//判断class
Mk.prototype.hasClass = function(str){
	for( var i = 0,len=this.elements.length; i < len; i++ ){
		if ( this.elements[i].className.match(new RegExp( '(\\s|^)' + str + '(\\s|$)' )) ){
			return true;
		}
	}
	return false;
};

//css方法
Mk.prototype.css = function (attr, value) {
	for (var i = 0; i < this.elements.length; i++) {
		if(arguments.length == 1){
			if(typeof window.getComputedStyle !='undefined'){
				return window.getComputedStyle(this.elements[i],null)[attr];
			}
		}
		this.elements[i].style[attr] = value;
	}
	return this;
};

//属性设置
Mk.prototype.attr = function(attr , value){
	for(var i =0; i < this.elements.length; i++){
		if(arguments.length == 1){
			return this.elements[i].getAttribute(attr);
		}
		this.elements[i].setAttribute(attr, value);
	}
	return this;
};

//设置显示
Mk.prototype.show = function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display = "block";
	}
	return this;
};

//设置隐藏
Mk.prototype.hide = function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display = "none";
	}
	return this;
};

//html方法
Mk.prototype.html = function (str) {
	for (var i = 0; i < this.elements.length; i++) {
		if(arguments.length == 0){
			return this.elements[i].innerHTML;
		}
		this.elements[i].innerHTML = str;
	}
	return this;
};

//val方法
Mk.prototype.val = function (str) {
	for (var i = 0; i < this.elements.length; i++) {
		if(arguments.length == 0){
			return this.elements[i].value;
		}
		this.elements[i].value = str;
	}
	return this;
};

//获取某一个节点在整个节点组中是第几个索引
Mk.prototype.index = function () {
	var children = this.elements[0].parentNode.children;
	for (var i = 0; i < children.length; i ++) {
		if (this.elements[0] == children[i]) return i;
	}
};
/**
 * @description M对象扩展
 */

//m.url对象
m.url = {
	//获取网址不带参数
	onlyHtml : function(str){
		(!str) ? str = window.location.href : '';
		if(str.indexOf('?')>=0){
			return str.substring(0,str.indexOf('?'))
		}
		return str ;
	},
	//获取url中参数的值
	getParams:function(name){
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return r[2];
			return null;
	}
	,
	//来源域名
	preDomain:function(){
		var preUrl = document.referrer;
		var _url = preUrl.replace(/http:\/\/|https:\/\//,'')
		console.log(_url.substr(0,_url.indexOf('/')))
		return _url.substr(0,_url.indexOf('/'));
	},
	curDomain:function(url){
		var curUrl = url ||window.location.href;
		var _url = curUrl.replace(/http:\/\/|https:\/\//,'')
		console.log(_url.substr(0,_url.indexOf('/')))
		return _url.substr(0,_url.indexOf('/'));
	},
	//返回上一步
	back:function(){
		window.location.href = (window.history.go(-1) || document.referrer || window.back());
	}
};

/**
 * @description 判断浏览器和系统
 * */
m.brower = {
	u:navigator.userAgent,
	
	weixin:function(){
		return this.u.indexOf("MicroMessenger") > -1;
	},
	android:function(){
		return this.u.indexOf("Android") > -1 || this.u.indexOf('Linux') > -1
	},
	iphone:function(){
		return this.u.indexOf('iPhone') > -1 || this.u.indexOf('Mac') > -1
	},
	mobile:function(){
		return this.u.indexOf('Mobile') > -1
	}
};

//对象扩展
m.json = {
	toArray:function(opt){
	var str = JSON.stringify(opt).replace(/^{|}|\"|$/g,'').split(',');
		var arr = [];
		for(var i = 0; i<str.length;i++){
			arr.push(str[i].split(':'));
		}
		return arr;
	},
	/**
	 * @description json转成成url参数形式
	 * @example var data = {"name":"yanyutao","sex":"nv"}
		console.log(m.json.toParams(data))
	 * */
	toParams:function(data) {
        var arr = [];
        for (var name in data) {
            arr.push(name + "=" + data[name]);
        }
        return arr.join("&");
    }
};

//storage 存取
m.local = {
   	get:function (name) {
        return localStorage.getItem(name);
    },
    set:function (name, value) {
        localStorage.setItem(name,value);
    },
    delete: function(name,value){
        localStorage.removeItem(name,value);
    },
    isEmpty : function(name){
        var values = this.get(name);
        if(values==null || values==''){
            return false;
        }else{
            return true;
        }
    }
};

//session 存取
m.session = {
   	get:function (name) {
        return sessionStorage.getItem(name);
    },
    set:function (name, value) {
        sessionStorage.setItem(name,value);
    },
    delete: function(name,value){
        sessionStorage.removeItem(name,value);
    },
    isEmpty : function(name){
         var values = this.get(name);
        if(values==null || values==''){
            return false;
        }else{
            return true;
        }
    }
};

//cookie 存取
m.cookie = {
	 set:function(name,value,iday,domain){
			var oDate = new Date();
			oDate.setDate(oDate.getDate()+iday);
			if(domain){
				document.cookie=name+'='+value+';expires='+(oDate||30)+';path=/'+';domain='+domain;
				return;
			}
			document.cookie=name+'='+value+';expires='+(oDate||30)+';path=/';
		},
	 get:function(name){
				var arr=document.cookie.split('; ');
				for(var i=0;i<arr.length;i++){
					var arr2 = arr[i].split('=');
					if(arr2[0]==name){
						return arr2[1];
					}
				}
				return '';
		},
	delete:function(name){
		this.set(name,1,-1)
	}
};

//ui组件入口
m.ui = {
	//弹出层
	layer:function(opt,dom){
		var ele = document.createElement('div');
		ele.className = 'mask';
		ele.id = 'pop';
		var str = '<div class="pop" style="width:'+(opt.width || 240)+'px;height:'+(opt.height || 120)+'px;">'+(dom || '')+'</div>';
		ele.innerHTML = str;
		try{
			document.body.insertBefore(ele,m('script').elements[0]);
		}catch(e){
			document.body.appendChild(ele);
		}
	},
	//提示框
	alert:function(opt){
		var dom = '<p>'+opt.msg+'</p><footer><span class="btn '+(opt.classVal||'')+' btn-sure">'+(opt.btnVal ||'确定')+'</span></footer>';
		this.layer(opt,dom);
		this.layerEvent();
	},
	//确认框
	confirm:function(opt){
		var dom = '<p>'+opt.msg+'</p><footer class="row"><span class="btn '+(opt.classCancel || '')+' bg-gray btn-cancel col-6">'+(opt.btnCancel || "取消" )+'</span><span class="btn '+(opt.classSure ||'')+' btn-sure bg-red col-6">'+ (opt.btnSure || '确定')+'</span></footer>';
		this.layer(opt,dom);
		this.layerEvent();
	},
	//删除层
	delLayer:function(){
		if(m('#pop')){
			document.body.removeChild(m('#pop').elements[0]);
		}
		return;
	}
	,
	layerEvent:function(){
		var self = this;
		m('.btn-sure').click(function(){
			self.delLayer();
		});
		m('.btn-cancel').click(function(){
			self.delLayer();
		});
	},
	//loading加载
	showLoad :function(imgurl){
		var ele = document.createElement('div');
		ele.className = 'mask'; 
		ele.id = 'loading';
		ele.innerHTML = '<img class="loading" src="'+imgurl+'" alt="" />';
		if(m('script').elements[0]){
			document.body.insertBefore(ele,m('script').elements[0]);
		}else{
			document.body.appendChild(ele);
		}
	}
	,
	//loading隐藏
	hideLoad:function(){
		if(m("#loading")){
			document.body.removeChild(m('#loading').elements[0])
		}
		return;
	},
	//返回顶部
	goTop:function(){
		var ele = document.createElement('div');
		var s = m("script").elements[0]; 
		ele.id = 'go-top';
		ele.className = 'none';
		s.parentNode.insertBefore(ele,s);
		
		window.onscroll = function(){
		    var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
		    if(scrolltop >= 100){
		    	m("#go-top").removeClass('none');
		    }else if(scrolltop<100){
		    	m("#go-top").addClass('none');
		    }
		};
		
	   m("#go-top").click(function(){
	    	document.documentElement.scrollTop = document.body.scrollTop = 0;
	    	m(this).addClass('none');
	   })
	   
	},
	//选项卡
	tab:function(th,tc){
			var th = document.querySelectorAll(th);
			var tc = document.querySelectorAll(tc);
			for(var i=0;i<th.length;i++){
				th[i].index = i;
				th[i].onclick = function(){
					for(var i=0;i<th.length;i++){
						th[i].className = '';
						tc[i].className = 'none';
					}
					this.className = 'current';
					tc[this.index].className = '';
				}
			}
		},
	//吸顶
	stickup:function(ele){
		var ele = document.querySelector(ele);
		var height = ele.offsetTop;
		window.onscroll = function(){
			var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
			if(scrollTop > height){
				ele.className = 'fixed-top';
			}else if(scrollTop < height){
				ele.className = '';
			}	
		}
	}
};

//正则组件
m.reg = {
	isMobile:function(num){ 
		var reg=/^(13[\d]{9}|15[\d]{9}|17[6-8][\d]{8}|14[57][\d]{8}|18[\d]{9})$/; 
		if(reg.test(num)){
			return true;
		}
		return false;
	},
	isSpecialString:function(str){ //过滤特殊字符
		if(/[^\u4E00-\u9FA5\d\w \(\)\（\）\.]/g.test(str)){
			return false;
		}
		return true;
	},isPositiveNumInt:function(num){  //大于等于0的整数
		var txtnum= /^[0-9]+$/;
		if(!txtnum.test(num)){
			return false;
		}
		return true;
	}
};


/**
 * @description 商城常用组件
 * */
m.shop = {
	//价格保留2为小数
	twoDotNum:function(num){
		var f = parseFloat(num);    
	    if (isNaN(f)) {    
	        return false;    
	    }    
	    var f = Math.round(x*100)/100;    
	    var s = f.toString();    
	    var rs = s.indexOf('.');    
	    if (rs < 0) {    
	        rs = s.length;    
	        s += '.';    
	    }    
	    while (s.length <= rs + 2) {    
	        s += '0';    
	    }    
	    return s;    
	},
	//加购物车
	jia :function(num,maxNum){
		if(num < maxNum){
			num++;
		}else{
			m.alert('已达到最大购买数量');
			return;
		}
		return num;
	}
	,
	//减购物车
	jian:function(num){
		if(num<=1){
			num=1
		}else{
			num--;	
		}
		return num;
	}
};

/**
 * @description 地图常用组件
 * */
m.map = {
	j:0,
	w:0,
	province:'',
	city:'',
	district:'',
	street:'',
	streetNumber:'',
	
	/**
	 * @需要引入 <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=Ij4rlelmIwh3UhC64cjwFZE9"></script>
	 * @description 百度地图定位城市 （浏览器）
	 */
	baidu_lnglat:function(){
		var self = this;
		var geolocation = new BMap.Geolocation();
		geolocation.getCurrentPosition(function(r){
			console.log(r)
			if(this.getStatus() == BMAP_STATUS_SUCCESS){
				self.j = r.point.lng;
				self.w = r.point.lat;
			}else {
				console.log(this.getStats());
			}        
		},{enableHighAccuracy: true});
		
		
	},
	
	/**
	 * @description 通过传入经纬度获取当前城市(百度地图API)
	 */
	baidu_address:function(fn){
		var self = this;
	    var point = new BMap.Point(self.j,self.w);
	    var gc = new BMap.Geocoder();
	    gc.getLocation(point, function(rs){
	    	console.log(rs)
	    	var addComp = rs.addressComponents;
	    	self.province = addComp.province;
	    	self.city = addComp.city;
	    	self.district = addComp.district;
	    	self.street = addComp.street;
	    	self.streetNumber = addComp.streetNumber;
	    	fn();
	    });
	}
};

/**
 * @description 日期原型扩展
 * */
//日期：毫秒数切换成年月日 alert(new Date(1432648098000).Format("yyyy-MM-dd HH-MM"))
Date.prototype.Format = function(formatStr) {   
    var str = formatStr;   
    var Week = ['日','一','二','三','四','五','六'];  
    str=str.replace(/yyyy|YYYY/,this.getFullYear());   
    str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));   
    str=str.replace(/MM/,(this.getMonth()+1)>9?(this.getMonth()+1).toString():'0' + (this.getMonth()+1));   
    str=str.replace(/M/g,this.getMonth()+1);   
    str=str.replace(/w|W/g,Week[this.getDay()]);   
    str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());   
    str=str.replace(/d|D/g,this.getDate());   
    str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());   
    str=str.replace(/h|H/g,this.getHours());   
    str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());   
    str=str.replace(/m/g,this.getMinutes());   
    str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());   
    str=str.replace(/s|S/g,this.getSeconds());   
    return str;   
};


/**
 * @description 字符串原型扩展
 * */

//删除空格
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
};



