import axios, { AxiosRequestConfig } from 'axios';
import APIURL, { APIStatus, APIDataResponseInfo, APIDataResponse, APIDataResponseSingle } from '../configs/APIConfig';
import LoginUtils from '../utils/loginUtils';
import moment from 'moment';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory()

class AxiosCommon {

    constructor() {
        Date.prototype.toISOString = function () {
            return moment(this).format("YYYY-MM-DDTHH:mm:ss");
        }
    }
   

    public async request<T>(options: AxiosRequestConfig,
        ignoreToken: boolean = false) {
        try {
            if (!ignoreToken)
                options = this.autoSetTokenRequest(options);
            options.timeout = 1000 * 60 * 29;
            const res = await axios.request<APIDataResponse<T>>(options);
            res.data.status = this.ProcessStatusResponeData(res);
            return res.data;
        }
        catch (error1) {
            var error = error1 as any;
            let data: APIDataResponse<T> = {} as any;
            if (error.request.status == 401) {
                var res = await this.RefeshToken();
                if (res.data.status === APIStatus.ERROR) {
                    LoginUtils.SetLogout();
                    history.push('/Login');
                    window.location.reload();
                    data.status = APIStatus.UNAUTHORIZED;
                    data.message = 'Internet error';
                    return data;
                }
                else {
                    var dataInfo = JSON.stringify(res.data);
                    LoginUtils.SetLogin(dataInfo);
                    data = await this.request<T>(options, ignoreToken);
                    return data;
                }
            }
            else {
                data.status = APIStatus.ERROR;
                data.message = 'Internet error';
                return data;
            }
        }
    }

    public async requestSingle<T>(options: AxiosRequestConfig,
        ignoreToken: boolean = false) {
        try {
            if (!ignoreToken)
                options = this.autoSetTokenRequest(options);
            options.timeout = 1000 * 60 * 29;
            const res = await axios.request<APIDataResponseSingle<T>>(options);
            res.data.status = this.ProcessStatusResponeData(res);
            return res.data;
        }
        catch (error1) {
            var error = error1 as any;

            let data: APIDataResponseSingle<T> = {} as any;
            if (error.request.status == 401) {
                var res = await this.RefeshToken();
                if (res.data.status === APIStatus.ERROR) {
                    LoginUtils.SetLogout();
                    history.push('/Login');
                    window.location.reload();
                    data.status = APIStatus.UNAUTHORIZED;
                    data.message = 'Internet error';
                    return data;
                }
                else {
                    var dataInfo = JSON.stringify(res.data);
                    LoginUtils.SetLogin(dataInfo);
                    data = await this.requestSingle<T>(options, ignoreToken);
                    return data;
                }
            }
            else {
                data.status = APIStatus.ERROR;
                data.message = 'Internet error';
                return data;
            }
        }
    }

    public async requestInfo<T>(options: AxiosRequestConfig,
        ignoreToken: boolean = false) {
        try {
            if (!ignoreToken)
                options = this.autoSetTokenRequest(options);
            options.timeout = 1000 * 60 * 29;
            const res = await axios.request<APIDataResponseInfo<T>>(options);
            res.data.status = this.ProcessStatusResponeData(res);
            if (res.data.status == APIStatus.ERROR) {
                res.data.data.info = [{ Total: 0 }];
                res.data.data.result = [];
            }
            return res.data;
        }
        catch (error1) {
            var error = error1 as any;

            let data: APIDataResponseInfo<T> = {} as any;
            if (error.request.status == 401) {
                var res = await this.RefeshToken();
                if (res.data.status === APIStatus.ERROR) {
                    LoginUtils.SetLogout();
                    history.push('/Login');
                    window.location.reload();
                    data.status = APIStatus.UNAUTHORIZED;
                    data.message = 'Internet error';
                    return data;
                }
                else {
                    var dataInfo = JSON.stringify(res.data);
                    LoginUtils.SetLogin(dataInfo);
                    data = await this.requestInfo<T>(options, ignoreToken);
                    return data;
                }
            }
            else {
                data.data = { info: [{ Total: 0 }], result: [] };
                data.status = APIStatus.ERROR;
                data.message = 'Internet error';
                return data;
            }
        }
    }
    public async requestListObject<T>(options: AxiosRequestConfig,
        ignoreToken: boolean = false) {
        try {
            if (!ignoreToken)
                options = this.autoSetTokenRequest(options);
            options.timeout = 1000 * 60 * 29;
            const res = await axios.request<T>(options);
            return res;
        }
        catch (error1) {
            var error = error1 as any;
            let data: T = {} as any;
            if (error.request == 401) {
                var res = await this.RefeshToken();
                if (res.data.status === APIStatus.ERROR) {
                    LoginUtils.SetLogout();
                    history.push('/Login');
                    window.location.reload();
                    return error;
                }
                else {
                    var dataInfo = JSON.stringify(res.data);
                    LoginUtils.SetLogin(dataInfo);
                    return dataInfo;
                }
            }
            else {
                return error;
            }
        }
    }

    public async RefeshToken() {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.REFESH_TOKEN;
        optionRequest.data = {
            token: LoginUtils.GetTokenLogin(),
            refreshToken: LoginUtils.GetRefeshTokenLogin()
        };
        return await axios.request<any>(optionRequest);
    }

    private autoSetTokenRequest(options: AxiosRequestConfig): AxiosRequestConfig {
        if (LoginUtils.IsLogin()) {
            let token = LoginUtils.GetTokenLogin();
            if (token !== '') {
                if (options.headers !== undefined) {
                    if (Object.keys(options.headers).length > 0) {
                        options.headers.Authorization = 'Bearer ' + token;
                    }
                    else {
                        options.headers = {
                            "Authorization": 'Bearer ' + token
                        };
                    }
                }
                else {
                    options.headers = {
                        "Authorization": 'Bearer ' + token
                    };
                }
            }
        }
        return options;
    }
    private ProcessStatusResponeData = (res: any) => {
        if (res === undefined || res === '' || res === null)
            return APIStatus.ERROR;
        let Status: number = res.data.status;
        if (Status === APIStatus.ERROR ||
            Status === APIStatus.INTERNET_ERROR ||
            Status === APIStatus.NOT_FOUND ||
            Status === APIStatus.UNAUTHORIZED ||
            Status === APIStatus.TOKEN_EXPIRED)
            return APIStatus.ERROR;
        else if (Status === APIStatus.EXPORT_HH_OUT_TOTAL)
            return APIStatus.EXPORT_HH_OUT_TOTAL;
        else return APIStatus.SUCCESS;
    }

}
export default AxiosCommon;