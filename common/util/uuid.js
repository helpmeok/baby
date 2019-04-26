export function phoneUUID() {
	for (var c = [], m = 0; 36 > m; m++) c[m] = "0123456789abcdef".substr(Math.floor(16 * Math.random()), 1);
	c[14] = "4";
	c[19] = "0123456789abcdef".substr(c[19] & 3 | 8, 1);
	c[8] = c[13] = c[18] = c[23] = "-";
	return c.join("")
}