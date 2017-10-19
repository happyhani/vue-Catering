/**
 * 2个方法，一个存储，一个查找
 * 存储saveToLocal。id是商家id值，key是以后除了favorite还有不同的字段
 * 读取loadFromLocal，前两个参数一样，def是当读不到的时候，传入一个def变量，作为一个默认值。
 */

export function saveToLocal (id, key, value) {
  let seller = window.localStorage.__seller__;// 双下划綫代表私有的。用这个字段，相当于一个名称空间。把所有的值都存在localStorage.__seller__中
// 存储的是一个json字符串
  if (!seller) {
  	seller = {};
  	seller[id] = {};
  } else {
    seller = JSON.parse(seller); // 转化为对象
    if (!seller[id]) {
    	seller[id] = {};
    }
  }
  seller[id][key] = value;
  window.localStorage.__seller__ = JSON.stringify(seller);
};
export function loadFromLocal (id, key, def) {
  let seller = window.localStorage.__seller__;
  if (!seller) {
  	return def;// 没有seller就是默认值
  }
  seller = JSON.parse(seller)[id];
  if (!seller) {
    return def;
  }
  var ret = seller[key];// 有id的值的话
  return ret || def;
};
/* storage{
  '1345': {'favorite': true},
  '2345': {'favorite': false}
} */
