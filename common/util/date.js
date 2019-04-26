Date.prototype.format = function(format)
{
	var o = {
            "M+" : this.getMonth()+1, //month
            "d+" : this.getDate(), //day
            "h+" : this.getHours(), //hour
            "m+" : this.getMinutes(), //minute
            "s+" : this.getSeconds(), //second
            "q+" : Math.floor((this.getMonth()+3)/3), //quarter
            "S" : this.getMilliseconds() //millisecond
        }
    if(/(y+)/.test(format))
    format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
    if(new RegExp("("+ k +")").test(format))
    format = format.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
    return format;
}
 
export function chGMT(){
	var mydate = new Date(Date.now());
	console.log(mydate)
	mydate.setHours(mydate.getHours() + 8);
	return parseInt(new Date(mydate.format("yyyy-MM-dd hh:mm:ss")).getTime()/1000);
		// return parseInt(new Date(formatDateTime(mydate)).getTime()/1000);
}
// 处理到天为止
export function transformDate(param) {
	let time = new Date(parseInt(param))
	let y = time.getFullYear()
	let m = time.getMonth() + 1
	let d = time.getDate()
	let currentTime = y + '年' + m + '月' + d + '日'
	return currentTime
}
// 处理到秒
export function transformSpecificTime(param) {
	let time = new Date(parseInt(param))
	let y = time.getFullYear()
	let m = time.getMonth() + 1
	let d = time.getDate()
	let hh = time.getHours()
	let mm = time.getMinutes()
	let ss = time.getSeconds()
	if (hh < 10) {
		hh = '0' + hh
	}
	if (mm < 10) {
		mm = '0' + mm
	}
	if (ss < 10) {
		ss = '0' + ss
	}
	let specificTime = y + '年' + m + '月' + d + '日   ' + hh + ':' + mm + ':' + ss
	return specificTime
}
export function formatDateTime(inputTime) { //时间戳 转 YY-mm-dd HH:ii:ss 
	var date = new Date(inputTime);
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	m = m < 10 ? ('0' + m) : m;
	var d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	var h = date.getHours();
	h = h < 10 ? ('0' + h) : h;
	var minute = date.getMinutes();
	var second = date.getSeconds();
	minute = minute < 10 ? ('0' + minute) : minute;
	second = second < 10 ? ('0' + second) : second;
	return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}
