//????cookie
function setCookie(name,value,min){
	min = typeof(min)== 'undefined'?30:min; //????????30????
	var exp  = new Date();
	exp.setTime(exp.getTime() + min*60*1000);
	document.cookie = name + "="+ encodeURI(value) +";path=/;expires="+ exp.toGMTString();
}
//????cookie
function getCookie(name){
	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
	if(arr != null) return decodeURI(arr[2]); 
	return null;
}

//????cookie
function delCookie(name){
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=getCookie(name);
	if(cval!=null) document.cookie=name +"="+cval+";path=/;expires="+exp.toGMTString();
}

//??????????
function setCookies(name,value,min){
	var cookie = getCookie(name);
	if(cookie == null){
		setCookie(name,value,min);
	}else{
		if(cookie.indexOf(value)==-1){
			value = cookie+","+value;
			setCookie(name,value,min);
		}
	}
}