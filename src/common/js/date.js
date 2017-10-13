export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
  	fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    // 遍历，动态构造正则表达式
  	if (new RegExp(`(${k})`).test(fmt)) {
  		let str = o[k] + ''; // 要替换的值
  	  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str)); // 如果M的长度是1，那就是一个值（例如：1-9），如果是MM的话就需要补零，也就是（01-09）
  	}
  }
  return fmt;
};

// 小技巧 日期补零
function padLeftZero (str) {
	return ('00' + str).substr(str.length);
}
