export function setCookie(cname: string, cvalue: string, exdays: number) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  const expires = `expires=${d.toUTCString()}`;
  const domain = 'domain=centmap.com';
  document.cookie = `${cname}=${cvalue};${expires};${domain}`;
  // SameSite=None; Secure
}

export function getCookie(cname: any) {
  const name = `${cname}=`;
  const ca = document.cookie.split(';');
  const c = ca[0].trim();
  if (c.indexOf(name) === 0) {
    return c.substring(name.length, c.length);
  } else {
    return '';
  }
}

export function checkCookie() {
  let user = getCookie('username');
  if (user !== '') {
    alert(`欢迎${user}再次访问`);
  } else {
    user = `${prompt('请输入你的名字:', '')}`;
    if (user !== '' && user != null) {
      setCookie('username', user, 7);
    }
  }
}