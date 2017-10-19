/**
 * 解析url参数
 * @example ?id=123&a=b
 * @return Object {id:123, a:b}
 */

export function urlParse () {
  let url = window.location.search,
      obj = {},
      reg = /[?&][^?&]+=[^?&]+/g,
      arr = url.match(reg);
  // 得到数组["?id=123", "&a=b"]
  if (arr) {
  	arr.forEach((item) => {
  	  let tempArr = item.substring(1).split('='),
  	      key = decodeURIComponent(tempArr[0]),
  	      val = decodeURIComponent(tempArr[1]);
  	  obj[key] = val;
  	});
  };
  return obj;
}
