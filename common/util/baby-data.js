let numberArr = new Array(100);
let mensesDaysArr = [];
let mensesCycleArr = [];
let babyPrematureArr = ['无'];
for (let i = 0; i < numberArr.length; i++) {
	if (i >= 2 && i <= 14) {
		mensesDaysArr.push(i + '天')
	}
	if (i >= 18 && i <= 90) {
		mensesCycleArr.push(i + '周')
	}
}
for (var i = 0; i < 10; i++) {
	babyPrematureArr.push((i + 1) + '周')
}
export default {
	mensesDaysArr,
	mensesCycleArr,
	babyPrematureArr
}
