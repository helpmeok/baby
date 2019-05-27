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
			// console.log('++'+ai.letter)
			dest.push({
				letter: ai.letter,
				list: [ai]
			});
			map[ai.letter] = ai;
		} else {
			// console.log('--'+ai.letter)
			for (var j = 0; j < dest.length; j++) {
				var dj = dest[j];
				if (dj.letter == ai.letter) {
					dj.list.push(ai);
					break;
				}
			}
		}
	}
	let p = /[a-zA-Z]/i;
	let arr = []
	for (var index in dest) {
		// console.log(dest[index])
		// console.log(!p.test(dest[index].letter))
		if (!p.test(dest[index].letter)) {
			// dest.splice(index, 1)
			dest[index].letter = "#"
			arr.push(dest[index])
		}else{
			dest[index].letter = dest[index].letter.toUpperCase()
		}
	}
	dest.sort(function(a, b) {
		return a.letter.charCodeAt() - b.letter.charCodeAt()
	})
	let arr1 = []
	let obj1 = {
		letter: "#",
		list: []
	}
	for (var i in dest) {
		console.log(dest[i].letter)
		if (dest[i].letter=="#") {
			obj1.list = obj1.list.concat(dest[i].list)
			dest.splice(i, 1)
		} 
	}
	let newArr = []
	newArr.push(obj1)
	console.log(newArr)
	console.log(dest)
	// newArr.concat(dest)
	return dest.concat(newArr);

}
export function getImgsrc(htmlstr) {
	var reg = /<img.+?src=('|")?([^'"]+)('|")?(?:\s+|>)/gim;
	var imgsrcArr = [];
	while (tem = reg.exec(htmlstr)) {
		imgsrcArr.push(tem[2]);
	}
	return imgsrcArr;
}
