interface roleApp {
    roleAppID: number;
    roleID: number;
    menuAppID: number
}
export interface roleAppVm extends roleApp {
    rolename: string;
    reportname: string;
}
export default roleApp;