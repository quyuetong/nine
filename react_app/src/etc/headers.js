import Cookies from 'universal-cookie';

export function getHeaders() {
    const headers = {headers: {'Content-Type': 'application/json'}};
    const cookies = new Cookies();
    const authToken = cookies.get("token");
    if (authToken !== undefined) {
        headers.headers.Authorization = "Token " + authToken;
    }
    return headers
}