import Cookies from 'universal-cookie';

export function getCookie(key) {
    const cookies = new Cookies();
    return cookies.get(key);
}

export function removeCookie() {
    const cookies = new Cookies();
    cookies.remove("token");
    cookies.remove("firstname");
    cookies.remove("lastname");
}