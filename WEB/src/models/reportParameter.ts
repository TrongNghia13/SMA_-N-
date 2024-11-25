interface ReportParameter {
    reportParameterID : number,
    reportID:number,
    reportParameterName:string,
    sortOrder : number,
    reportParameterType:number,
    required : boolean,
    paramName : string, 
    getAuto : boolean
}
export default ReportParameter;