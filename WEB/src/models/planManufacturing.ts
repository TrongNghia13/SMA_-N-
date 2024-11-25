interface planManufacturing {
    planManufacturingID: number,
    branchID: string,
    monthID?: string,
    planDate:Date,
    materialType:string,
    planNo:string,
    productionPlanID:string,
    planDescription:string,
    totalSource:number,
    totalTarget:number,
    createdBy:string,
    createdDate?:Date,

}

export default planManufacturing;