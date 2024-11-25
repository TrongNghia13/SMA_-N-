interface logStatus {
    loginid: number;
    userid: number;
    username: string;
    ngay_login: Date;
    ngay_logout: Date;
    ip_login: string;
    erpid: number;
    donviud: string
}

export interface logStatusVm  extends logStatus {
    tennv: string;
    tenerp: string;
    tendonviud: string
}


export default logStatus; 