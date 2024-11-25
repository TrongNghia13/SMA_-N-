import AppConfig from '../configs/AppConfig';
import TokenUtils from './tokenUtils';
import { decodeJwt } from 'jose';
class LoginUtils {

    static SetLogin(loginInfo: any) {

        TokenUtils.SetToken(AppConfig.USER_LOGIN_TOKEN_KEY, loginInfo);
    }
    static SetLogout() {
        TokenUtils.RemoveToken(AppConfig.USER_LOGIN_TOKEN_KEY);
    }
    static GetLogin() {
        return TokenUtils.GetToken(AppConfig.USER_LOGIN_TOKEN_KEY) || '';
    }
    static GetInfo() {
        var userInfo = this.GetLogin();
        if(userInfo === null || userInfo === "" || userInfo === undefined) {
             return '';
        }
        const claims = decodeJwt(this.GetLogin());
        const objTokenRaw = JSON.stringify(claims);
        const objToken = JSON.parse(objTokenRaw);
        return objToken;
    }
    static GetTokenLogin() {
        if(this.IsLogin()) {
            const objToken = this.GetInfo();
            return objToken.TokenID;
        }
        else return '';
    }
    static GetRefeshTokenLogin() {
        if(this.IsLogin()) {
            const objToken = this.GetInfo();
            return objToken.TokenID;
        }
        else return '';
    }
    static IsLogin(): boolean {
        var IsLogin: boolean = true;
        const tokenInfo = this.GetInfo();
        try {
            if (tokenInfo === '' || tokenInfo === undefined) {
                IsLogin = false;
            }
            else {
                const objToken = tokenInfo;
                if (Object.keys(objToken).length === 0) {
                    IsLogin = false;
                }
                else {
                    if (objToken.TokenID === '') {
                        IsLogin = false;
                    }
                }
            }
        }
        catch (error) {
            IsLogin = false;
        }
        return IsLogin;
    }
}
export default LoginUtils;