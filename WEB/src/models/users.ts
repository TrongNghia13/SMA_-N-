// import USER_KHUNGGIO from './USER_KHUNGGIO';

interface users {
    userID: number,
    employeeID: number,
    userName: string,
    password: string,
    isActive: boolean,
    passwordRealTime?: string,
    dashBoardID?: number,
    isAccessHour: boolean,
    isAccessIP: boolean,
    publicIP: string
}
export interface usersVm extends users {
    employeeName?: string
}

export interface usersManagerVm {
    user: usersVm;
    // erpforuser: Array<number>;
    roleForUser: Array<number>;
    branchForUser: Array<string>;
    // quyenhtforuser: Array<number>;
    // khunggiois: Array<USER_KHUNGGIO>;
}

export default users;