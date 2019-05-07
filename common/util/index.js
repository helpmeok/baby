// 参数分别为第一点的纬度，经度；第二点的纬度，经度
function Rad(d) {
	return d * Math.PI / 180.0; //经纬度转换成三角函数中度分表形式。
}
export function GetDistance(lat1, lng1, lat2, lng2) {
	var radLat1 = Rad(lat1);
	var radLat2 = Rad(lat2);
	var a = radLat1 - radLat2;
	var b = Rad(lng1) - Rad(lng2);
	var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
		Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
	s = s * 6378.137; // EARTH_RADIUS;
	s = Math.round(s * 10000) / 10000; //输出为公里
	//s=s.toFixed(4);
	return s;
}
export function AccMul(arg1, arg2) {
	var m = 0,
		s1 = arg1.toString(),
		s2 = arg2.toString();
	try {
		m += s1.split(".")[1].length
	} catch (e) {}
	try {
		m += s2.split(".")[1].length
	} catch (e) {}
	return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}
export function AccAdd(arg1, arg2) {
	var r1, r2, m;
	try {
		r1 = arg1.toString().split(".")[1].length
	} catch (e) {
		r1 = 0
	}
	try {
		r2 = arg2.toString().split(".")[1].length
	} catch (e) {
		r2 = 0
	}
	m = Math.pow(10, Math.max(r1, r2))
	return (arg1 * m + arg2 * m) / m
}

export function delRepArr(tempList) {
	var map = {},
		dest = [];
	for (var i = 0; i < tempList.length; i++) {
		var ai = tempList[i];
		if (!map[ai.letter]) {
			dest.push({
				letter: ai.letter,
				list: [ai]
			});
			map[ai.letter] = ai;
		} else {
			for (var j = 0; j < dest.length; j++) {
				var dj = dest[j];
				if (dj.letter == ai.letter) {
					dj.list.push(ai);
					break;
				}
			}
		}
	}
	let p = /[A-Z]/i;
	let arr = []
	for (let index in dest) {
		if (!p.test(dest[index].letter.toUpperCase())) {
			dest[index].letter = "#"
			arr.push(dest[index])
			dest.splice(index, 1)
		}
	}
	dest.sort(function(a, b) {
		return a.letter.charCodeAt() - b.letter.charCodeAt()
	})
	return arr.concat(dest);
}
