/**
 * 设置cookies
 */
export function setCookies(key, val, time) {
  let date = new Date();
  let expiresDays = time;
  date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000);
  let dm = document.domain;
  let dmArr = dm.split('.')
  if (dmArr.length >= 2 && dm.indexOf('.com') > -1) {
    dm = dmArr.slice(-2).join('.');
  }
  document.cookie = `${key}=${val};expires=${date.toGMTString()};domain=${dm}`;
}

/**
 * 获取url参数
 * @param {*} name 
 */
export function getDataQuery(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return decodeURI(r[2]);
  }
  return null;
}

/**
 * 格式化时间戳
 */
export function formatTime(time){
  var now = null
  if(time){
    now = new Date(time)
  }else{
    now = new Date()
  }
  var year = now.getFullYear();    
  var month = (now.getMonth()+1) < 10 ? '0' + (now.getMonth()+1) : (now.getMonth()+1);    
  var date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();    
  var hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();     
  var minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();     
  var second = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();  
  return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
}



