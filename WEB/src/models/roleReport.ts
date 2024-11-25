interface roleReport {
    roleReportID: number;
    roleID: number;
    reportID: number
}
export interface roleReport_VM extends roleReport {
    rolename: string;
    reportname: string;
}
export default roleReport;