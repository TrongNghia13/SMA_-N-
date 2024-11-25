interface logFrom {
    loginid: number,
    userid: number,
    username: string,
    ngay_th: Date,    
    menukey: string    
}

export interface logFromVm  extends logFrom {
    tenmenu: string
}


export default logFrom; 

