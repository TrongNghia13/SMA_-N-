interface organizationUnit {
    organizationUnitID: number,
    organizationUnitName: string,
    isParent: true,
    organizationUnitTypeID: number,
    companyOwnerName: string,
    phone: string,
    sortOrder: number
}
export interface organizationUnitVm  extends organizationUnit {
    organizationUnitTypeName: string
}

export interface organizationUnitTreeTable extends organizationUnitVm {
    key: string,
    children: Array<organizationUnit>
}
export default organizationUnit;