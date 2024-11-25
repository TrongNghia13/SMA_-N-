interface employee {
    employeeID: number,
    employeeCode: string,
    organizationUnitID: number,
    fullName: string,
    jobTitleID: number,
    employeeTel?: string,
    employeeEmail?: string,
    employeeImage: string,
    description: string,
}
export interface employeeVm extends employee {
    organizationUnitName: string,
    jobTitleName: string
}
export default employee;