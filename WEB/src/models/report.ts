interface Report {
    reportID: number,
    reportName: string,
    formKey: string,
    tsql: string,
    reportGroupID: number,
    isActive: boolean,
    paperSize: string,
    orientation: number,
    leftHeadlineID: number,
    isRightHeadline: boolean,
    marginLeft: number,
    marginRight: number,
    marginTop: number,
    marginBottom: number,
    sortOrder: number,
    isLock: boolean,
    reportGroupName?: string,

}
export default Report;