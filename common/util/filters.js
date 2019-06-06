exports.imgConversion = (value) => { //过滤富文本图片问题
	if (!value) return ''
	value = value.replace(/<img/g, '<img style="max-width:100%;"').replace(/<section/g, '<section style="max-width:100%;"').replace(/preview.html/g, 'player.html')
	return value
};
const now = Date.now();
exports.transformDate = (value) => { //时间处理
	value = value + (8 * 60 * 60 * 1000) //转换时区
	let time = new Date(parseInt(value))
	let timeDifference = now - time
	let nowTime = new Date(now)
	let y = time.getFullYear()
	let m = time.getMonth() + 1
	m = m < 10 ? ('0' + m) : m;
	let d = time.getDate()
	d = d < 10 ? ('0' + d) : d;
	let hh = time.getHours()
	hh = hh < 10 ? ('0' + hh) : hh;
	let mm = time.getMinutes()
	mm = mm < 10 ? ('0' + mm) : mm;
	let nd = nowTime.getDate()
	nd = nd < 10 ? ('0' + nd) : nd;
	let specificTime = y + '.' + m + '.' + d + '   ' + hh + ':' + mm
	let todayTime = hh + ':' + mm
	if (timeDifference <= (60 * 1000)) {
		return "刚刚"
	} else if (timeDifference <= (60 * 60 * 1000)) {
		return Math.floor(timeDifference / (60 * 1000)) + '分钟前'
	} else if (timeDifference <= (24 * 60 * 60 * 1000)) {
		if (nd == d) {
			return todayTime
		} else {
			return specificTime
		}
	} else {
		return specificTime
	}
};
exports.articleDataNum = (value) => { //列表的点击数、转发数、评论数、点赞数的规则

	if (value < 10000) {
		return value
	} else {
		let num = value / 10000
		var result = (num.toString()).indexOf(".");
		if (result != -1) {
			num = num.toFixed(1);
			if (num.split('.')[1].toString() == '0') {
				return num.split('.')[0] + '万'
			} else {
				return num + '万'
			}
		} else {
			return num + '万'
		}
	}
};
