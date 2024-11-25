class TokenUtils {
    static SetToken = (key: string, token: string) => {
        localStorage.setItem(key, token);
    }
    static GetToken =(key: string) => {
        return localStorage.getItem(key);
    }
    static RemoveToken = (key: string) => {
        localStorage.removeItem(key);
    }
}
export default TokenUtils;