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
export function getDataQuery(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return decodeURI(r[2]);
  }
  return null;
}